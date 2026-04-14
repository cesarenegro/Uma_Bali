import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../stores/productStore';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('common');
  
  // Note: App Router sends 'slug' but our store uses 'id' (which matches the slug exactly right now)
  const product = useProductStore(state => state.getProductById(slug || ''));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-sand text-charcoal">
        <h1 className="text-3xl font-light mb-4">{t('product.not_found', 'Product Not Found')}</h1>
        <Link to="/collections" className="text-sage border-b border-sage pb-1 hover:opacity-80 transition-opacity">
          {t('product.return_to_collections', 'Return to Collections')}
        </Link>
      </div>
    );
  }

  const mainImage = product.images?.[0] || '/placeholder-furniture.jpg';

  return (
    <div className="min-h-screen bg-[#e0d9b9] pt-24 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Gallery Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="aspect-square bg-travertine/40 relative overflow-hidden flex items-center justify-center p-8"
          >
            {product.isNew && (
              <span className="absolute top-6 left-6 z-10 bg-sage text-linen text-xs uppercase tracking-[0.2em] px-3 py-1.5">
                {t('product.new_arrival', 'New Arrival')}
              </span>
            )}
            <img 
              src={mainImage} 
              alt={product.name}
              className="w-full h-full object-contain pointer-events-none drop-shadow-xl mix-blend-darken"
            />
          </motion.div>
          
          {/* Thumbnails if available (we mapped one image but future proofing) */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1).map((img, idx) => (
                <div key={idx} className="aspect-square bg-travertine/40 p-2 cursor-pointer hover:border hover:border-charcoal/20 transition-all">
                  <img src={img} alt={`${product.name} view ${idx + 2}`} className="w-full h-full object-contain pointer-events-none mix-blend-darken" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Info Section */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Breadcrumb equivalent */}
            <div className="text-xs uppercase tracking-widest text-charcoal/50 mb-6 flex gap-2">
              <Link to="/collections" className="hover:text-charcoal transition-colors">{t('nav.collections')}</Link>
              <span>/</span>
              <Link to={`/collections/${product.category}`} className="hover:text-charcoal transition-colors">
                {t(`categories.${product.category.toLowerCase()}`, product.category)}
              </Link>
            </div>

            <h1 className="text-4xl md:text-5xl font-light text-charcoal tracking-wide mb-2 capitalize">
              {product.name}
            </h1>
            
            <p className="text-charcoal/50 text-sm tracking-wider uppercase mb-8">
              {t('product.code', 'Code')}: {product.id}
            </p>

            {/* Empty Price Space per Requirements */}
            <div className="h-10 mb-8" />

            <div className="prose prose-stone max-w-none mb-12">
              <p className="text-lg leading-relaxed font-light text-charcoal/90">
                {product.longDescription || product.description}
              </p>
            </div>

            {/* Specifications Details minimal styling */}
            <div className="border-t border-charcoal/10 pt-10 mt-10">
              <h3 className="text-sm uppercase tracking-[0.2em] mb-6 text-charcoal/70">{t('product.specifications', 'Specifications')}</h3>
              
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                
                {product.dimensions && product.dimensions.rawString && (
                  <div className="flex flex-col gap-1 border-b border-charcoal/5 pb-4">
                    <dt className="uppercase tracking-widest text-charcoal/50 text-xs">{t('product.dimensions', 'Dimensions (W/D/H)')}</dt>
                    <dd className="text-charcoal font-light">{product.dimensions.rawString} cm</dd>
                  </div>
                )}
                
                {product.materials && product.materials.length > 0 && (
                  <div className="flex flex-col gap-1 border-b border-charcoal/5 pb-4">
                    <dt className="uppercase tracking-widest text-charcoal/50 text-xs">{t('nav.materials')}</dt>
                    <dd className="text-charcoal font-light capitalize">{product.materials.join(', ')}</dd>
                  </div>
                )}

                {product.upholstery && (
                  <div className="flex flex-col gap-1 border-b border-charcoal/5 pb-4">
                    <dt className="uppercase tracking-widest text-charcoal/50 text-xs">{t('product.upholstery', 'Upholstery')}</dt>
                    <dd className="text-charcoal font-light">{product.upholstery}</dd>
                  </div>
                )}
                
                {(product.weight || product.volume) && (
                  <div className="flex flex-col gap-1 border-b border-charcoal/5 pb-4">
                    <dt className="uppercase tracking-widest text-charcoal/50 text-xs">{t('product.packaging', 'Packaging')}</dt>
                    <dd className="text-charcoal font-light">
                      {product.weight ? `${product.weight} kg ` : ''} 
                      {product.volume ? ` (${product.volume} m³)` : ''}
                    </dd>
                  </div>
                )}

                <div className="flex flex-col gap-1 border-b border-charcoal/5 pb-4">
                  <dt className="uppercase tracking-widest text-charcoal/50 text-xs">{t('product.customization', 'Customization')}</dt>
                  <dd className="text-charcoal font-light">
                    {product.isCustomizable ? t('product.bespoke_available', 'Bespoke options available') : t('product.standard_only', 'Standard finish only')}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Interaction Action (Empty Enquire button) */}
            <div className="mt-16">
              <button className="w-full bg-charcoal text-sand py-4 uppercase tracking-[0.2em] text-sm hover:bg-sage hover:text-linen transition-colors duration-300">
                {t('product.enquire', 'Enquire About This Piece')}
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
