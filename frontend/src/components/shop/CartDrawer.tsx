
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../../stores/productStore';

export default function CartDrawer() {
  const { t } = useTranslation('common');
  const { cartItems, isCartOpen, toggleCart, removeFromCart, updateCartQuantity, getProductById } = useProductStore();

  const handleOverlayClick = () => {
    toggleCart(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.productId);
      const price = product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const hasPricedItems = cartItems.some(item => {
    const product = getProductById(item.productId);
    return product && product.price && product.price > 0;
  });

  const hasUnpricedItems = cartItems.some(item => {
    const product = getProductById(item.productId);
    return !product || !product.price || product.price === 0;
  });

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-dune/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-linen shadow-2xl z-[101] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-travertine">
              <h2 className="heading-h3 text-espresso uppercase tracking-widest">{t('shop.shopping_cart', 'Shopping Cart')}</h2>
              <button 
                onClick={() => toggleCart(false)}
                className="text-espresso/60 hover:text-espresso transition-colors p-2 -mr-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-espresso/50">
                  <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="body-large uppercase tracking-widest">{t('shop.empty_cart', 'Your cart is empty')}</p>
                </div>
              ) : (
                cartItems.map(item => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  
                  return (
                    <div key={item.id} className="flex gap-4 p-4 bg-travertine/30 border border-travertine relative group">
                      <div className="w-24 h-24 bg-travertine/50 flex flex-shrink-0">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-dune/5" />
                        )}
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-heading font-medium text-espresso uppercase text-sm tracking-widest">{product.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-espresso/40 hover:text-espresso opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                        
                        <div className="text-xs text-espresso/60 mb-2 flex flex-col gap-0.5">
                          {item.woodFinish && <span>Wood: {item.woodFinish}</span>}
                          {item.fabricType && <span>Fabric: {item.fabricType}</span>}
                          {item.fabricColor && <span>Color: {item.fabricColor}</span>}
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-espresso/20">
                            <button 
                              className="px-2 py-1 text-espresso/60 hover:text-espresso"
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            >-</button>
                            <span className="px-3 py-1 text-sm">{item.quantity}</span>
                            <button 
                              className="px-2 py-1 text-espresso/60 hover:text-espresso"
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            >+</button>
                          </div>
                          
                          <div className="font-medium text-espresso">
                            {product.price 
                              ? `€${product.price.toLocaleString()}` 
                              : <span className="text-xs uppercase tracking-wider text-brand">{t('shop.price_on_request', 'Price on Request')}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-travertine bg-travertine/30">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-espresso/60 uppercase tracking-widest text-sm">{t('shop.subtotal', 'Subtotal')}</span>
                  <span className="heading-h3 text-espresso">€{calculateTotal().toLocaleString()}</span>
                </div>
                
                <p className="text-xs text-espresso/50 mb-6 text-center leading-relaxed">
                  {hasPricedItems && hasUnpricedItems 
                    ? t('shop.mixed_cart_notice', 'Your cart contains both priced items and items requiring a quote. Proceeding will generate a PDF quote form for complete accuracy.')
                    : hasUnpricedItems 
                      ? t('shop.quote_notice', 'Your selection will be sent as a quote request. Our team will prepare a custom offer for you.')
                      : t('shop.shipping_calculated', 'Shipping and taxes calculated at checkout.')}
                </p>
                
                <button className="w-full btn-primary py-4">
                  {hasUnpricedItems 
                    ? t('shop.request_quote_pdf', 'Prepare PDF Quote Request') 
                    : t('shop.checkout', 'Stripe Checkout')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
