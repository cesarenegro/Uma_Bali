import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../stores/productStore';
import ProductGrid from '../components/product/ProductGrid';

export default function CollectionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  
  const category = useProductStore((state) => state.categories.find(c => c.id === slug));
  
  // Actually, top items isn't a proper "category" in our raw data string, it's a tag we generated.
  const products = useProductStore((state) => {
    if (slug === 'top items') {
      return state.products.filter(p => p.tags?.includes('top-item'));
    }
    return state.getProductsByCategory(slug || '');
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-sand flex flex-col items-center justify-center">
        <h1 className="text-4xl font-light text-charcoal mb-4">{t('collection.not_found', 'Collection Not Found')}</h1>
        <Link to="/collections" className="text-sage border-b border-sage pb-1">{t('collection.back', 'Back to Collections')}</Link>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-sand">
      {/* Category Header */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {(category.coverImage || category.image) && (
          <div className="absolute inset-0 z-0">
            <img 
              src={category.coverImage || category.image} 
              alt={category.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/40" />
          </div>
        )}
        <div className="relative z-10 text-center text-sand px-6">
          <h1 className="text-5xl md:text-7xl font-light tracking-wide mb-4 capitalize">
            {t(`categories.${category.id}`, category.name)}
          </h1>
          <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
            {t('collection.explore_curated', 'Explore our curated selection of {{category}} designed for modern outdoor living.', { category: t(`categories.${category.id}`, category.name).toLowerCase() })}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="mb-12 flex justify-between items-end border-b border-charcoal/20 pb-4">
          <h2 className="text-3xl font-light text-charcoal">{t('collection.pieces', 'Pieces')}</h2>
          <span className="text-charcoal/60 font-light">{t('collection.items_count', '{{count}} Items', { count: products.length })}</span>
        </div>
        
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="py-20 text-center text-charcoal/60">
            <p>{t('collection.no_products', 'No products found in this collection.')}</p>
          </div>
        )}
      </section>
    </div>
  );
}
