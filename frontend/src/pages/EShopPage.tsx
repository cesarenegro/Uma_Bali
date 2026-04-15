import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '../stores/productStore';
import type { Product } from '../types';

export default function EShopPage() {
  const { t } = useTranslation('common');
  const { products, categories, getProductsByCategory, addToCart } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Quick Add Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWood, setSelectedWood] = useState<string>('');
  const [selectedFabricType, setSelectedFabricType] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const displayedProducts = selectedCategory === 'all' 
    ? products 
    : getProductsByCategory(selectedCategory);

  const handleQuickAdd = (product: Product) => {
    setSelectedProduct(product);
    // Determine defaults based on variants or materials
    const defaultWood = product.variants?.[0]?.woodFinish || 'Natural Teak';
    const defaultFabric = product.variants?.[0]?.fabricCode || 'Premium Outdoor Canvas';
    const defaultColor = product.variants?.[0]?.fabricColor || 'Sand';
    
    setSelectedWood(defaultWood);
    setSelectedFabricType(defaultFabric);
    setSelectedColor(defaultColor);
    setQuantity(1);
  };

  const confirmAddToCart = () => {
    if (selectedProduct) {
      addToCart({
        productId: selectedProduct.id,
        quantity,
        woodFinish: selectedWood || undefined,
        fabricType: selectedFabricType || undefined,
        fabricColor: selectedColor || undefined,
        priceIndicator: selectedProduct.price || 'on_request'
      });
      setSelectedProduct(null);
    }
  };

  return (
    <div className="bg-bgPrimary min-h-screen text-textPrimary pb-32">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url(/images/hero/Lounge_Pool.png)' }}
        />
        <div className="absolute inset-0 bg-dune/20" />
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="heading-display text-hero uppercase tracking-widest mb-6 text-[#f5f3eb]"
          >
            {t('nav.eshop', 'E-Shop')}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body-large text-sand max-w-2xl mx-auto mb-10"
          >
            {t('shop.hero_subtitle', 'Curate your outdoor oasis. Shop our collection or request custom quotes.')}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-4 mb-16 border-b border-travertine pb-6">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-6 py-2 rounded-full border text-sm uppercase tracking-widest transition-all ${
              selectedCategory === 'all' 
                ? 'bg-espresso text-linen border-espresso' 
                : 'border-espresso/20 text-espresso hover:border-espresso'
            }`}
          >
            {t('common.all', 'All')}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-6 py-2 rounded-full border text-sm uppercase tracking-widest transition-all ${
                selectedCategory === cat.id 
                  ? 'bg-espresso text-linen border-espresso' 
                  : 'border-espresso/20 text-espresso hover:border-espresso'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
          {displayedProducts.map(product => (
            <div key={product.id} className="group flex flex-col border border-travertine/50 p-3 bg-linen/50 hover:bg-white transition-colors duration-300">
              <div className="relative aspect-square bg-travertine/20 mb-3 overflow-hidden border border-travertine/30 flex items-center justify-center p-2">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105 p-2"
                />
                
                {/* Hover Add to Cart Overlay */}
                <div className="absolute inset-0 bg-dune/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => handleQuickAdd(product)}
                    className="bg-linen text-espresso px-3 py-1.5 text-[10px] sm:text-xs tracking-widest uppercase font-medium hover:bg-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                  >
                    {t('shop.quick_add', 'Configure')}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col flex-1">
                <div className="flex flex-col gap-1 mb-1">
                  <h3 className="heading-h3 text-espresso uppercase tracking-widest text-xs">{product.name}</h3>
                  <span className="font-medium text-espresso text-xs">
                    {product.price ? `€${product.price.toLocaleString()}` : <span className="text-brand text-[9px] uppercase tracking-wider">{t('shop.price_on_request', 'Price on Request')}</span>}
                  </span>
                </div>
                <p className="text-[10px] text-espresso/60 line-clamp-2 mt-1">
                  {product.shortDescription || product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Add Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[102] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-dune/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-linen w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl z-[103]"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-espresso/50 hover:text-espresso"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="bg-travertine/40 aspect-square md:aspect-auto flex items-center justify-center p-8 border-r border-travertine/20">
                  <img 
                    src={
                      selectedWood === 'Wenge Teak' && selectedProduct.images.length > 1 ? selectedProduct.images[1] :
                      selectedWood === 'Grey Teak' && selectedProduct.images.length > 2 ? selectedProduct.images[2] :
                      selectedProduct.images[0]
                    } 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-contain mix-blend-multiply" 
                  />
                </div>
                
                <div className="p-8 flex flex-col">
                  <h3 className="heading-h2 text-espresso mb-2">{selectedProduct.name}</h3>
                  <div className="text-lg font-medium text-espresso mb-4">
                    {selectedProduct.price ? `€${selectedProduct.price.toLocaleString()}` : <span className="text-brand text-sm uppercase tracking-wider">{t('shop.price_on_request', 'Price on Request')}</span>}
                  </div>
                  
                  <div className="text-sm text-espresso/80 mb-6 pb-6 border-b border-travertine">
                    <p className="mb-4">{selectedProduct.longDescription || selectedProduct.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-espresso/50 mb-1">Dimensions</span>
                        <p className="text-xs text-espresso">{selectedProduct.dimensions ? (selectedProduct.dimensions.rawString || `${selectedProduct.dimensions.width}x${selectedProduct.dimensions.depth}x${selectedProduct.dimensions.height} cm`) : 'Contact for sizes'}</p>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-espresso/50 mb-1">Availability</span>
                        <p className="text-xs text-espresso">To be confirmed</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 flex-1">
                    {/* Wood Finish Options */}
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-espresso/50 mb-3">{t('shop.select_wood', 'Wood Finish')}</span>
                      <div className="flex flex-wrap gap-3">
                        {['Natural Teak', 'Wenge Teak', 'Grey Teak'].map(wood => (
                          <button
                            key={wood}
                            onClick={() => setSelectedWood(wood)}
                            className={`px-3 py-2 border text-xs transition-colors ${selectedWood === wood ? 'border-espresso bg-espresso text-linen' : 'border-travertine text-espresso hover:border-espresso/50'}`}
                          >
                            {wood}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fabric Type & Color Options (Mock UI) */}
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-espresso/50 mb-3">{t('shop.select_fabric', 'Fabric & Color')}</span>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <select 
                          className="border border-travertine bg-transparent px-3 py-2 text-sm outline-none w-full"
                          value={selectedFabricType}
                          onChange={e => setSelectedFabricType(e.target.value)}
                        >
                          <option value="Premium Outdoor Canvas">Outdoor Canvas</option>
                          <option value="Bouclé">Bouclé</option>
                          <option value="Linen Blend">Linen Blend</option>
                        </select>
                        
                        <select 
                          className="border border-travertine bg-transparent px-3 py-2 text-sm outline-none w-full"
                          value={selectedColor}
                          onChange={e => setSelectedColor(e.target.value)}
                        >
                          <option value="Sand">Sand</option>
                          <option value="Charcoal">Charcoal</option>
                          <option value="Sage">Sage</option>
                          <option value="Terracotta">Terracotta</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <div className="flex border border-travertine items-center">
                      <button className="px-4 py-3 hover:bg-travertine/50" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                      <span className="w-8 text-center">{quantity}</span>
                      <button className="px-4 py-3 hover:bg-travertine/50" onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                    <button 
                      onClick={confirmAddToCart}
                      className="flex-1 btn-primary py-3"
                    >
                      {t('shop.add_to_cart', 'Add to Cart')}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
