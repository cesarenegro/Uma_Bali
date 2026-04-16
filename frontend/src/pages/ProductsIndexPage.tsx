import { useState } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { useProductStore } from '../stores/productStore';
import { useTranslation } from 'react-i18next';

export default function ProductsIndexPage() {
  const { products, categories, searchQuery, setSearch } = useProductStore();
  const { t } = useTranslation('common');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const filteredProducts = products.filter(product => {
    // Check search query
    if (searchQuery.trim()) {
      const qs = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(qs);
      const matchesDesc = product.description.toLowerCase().includes(qs);
      const matchesId = product.id.toLowerCase().includes(qs);
      if (!matchesName && !matchesDesc && !matchesId) {
        return false;
      }
    }

    // Check category filter
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(product.category);
  });

  return (
    <div className="bg-[#eeead7] min-h-screen pt-24 pb-32 text-charcoal">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-16 border-b border-charcoal/20 pb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-charcoal mb-4">{t('products.title') || 'All Products'}</h1>
          <p className="text-lg font-light text-charcoal/70 max-w-2xl">
            {t('products.subtitle') || 'Discover our complete collection of premium outdoor furniture.'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <h3 className="text-xl font-light text-charcoal mb-6 border-b border-charcoal/10 pb-4">{t('products.filters', 'Filters')}</h3>
            
            <div className="flex flex-col gap-4 mb-8">
              <div className="font-medium text-sm tracking-widest uppercase text-charcoal/50 mb-2">{t('products.search', 'Search')}</div>
              <div className="relative">
                <input 
                  type="text"
                  placeholder={t('products.search_placeholder', 'Name, code...')}
                  value={searchQuery}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border-b border-charcoal/30 focus:border-charcoal outline-none py-2 text-sm text-charcoal placeholder-charcoal/40 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-medium text-sm tracking-widest uppercase text-charcoal/50 mb-2">{t('products.category', 'Category')}</div>
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); handleCategoryChange(cat.id); }}>
                  <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${selectedCategories.includes(cat.id) ? 'bg-charcoal border-charcoal' : 'border-charcoal/30 group-hover:border-charcoal/60'}`}>
                    {selectedCategories.includes(cat.id) && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#F3F2EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-light capitalize transition-colors ${selectedCategories.includes(cat.id) ? 'text-charcoal' : 'text-charcoal/70 group-hover:text-charcoal'}`}>
                    {t(`categories.${cat.id.toLowerCase()}`, cat.name)}
                  </span>
                </label>
              ))}
            </div>
            
            {(selectedCategories.length > 0 || searchQuery.trim() !== '') && (
              <button 
                onClick={() => { setSelectedCategories([]); setSearch(''); }}
                className="mt-8 text-xs tracking-widest uppercase text-charcoal/50 hover:text-charcoal transition-colors underline underline-offset-4"
              >
                {t('products.clear_filters', 'Clear Filters')}
              </button>
            )}
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-8 flex justify-between items-end border-b border-charcoal/10 pb-4">
              <span className="text-sm tracking-widest uppercase text-charcoal/50">{t('products.viewing_items', 'Viewing {{count}} items', { count: filteredProducts.length })}</span>
            </div>
            
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="py-24 text-center">
                <p className="text-lg font-light text-charcoal/50">{t('products.no_match', 'No products match the selected filters.')}</p>
                <button 
                  onClick={() => setSelectedCategories([])}
                  className="mt-6 border border-charcoal px-6 py-2 text-sm tracking-widest uppercase hover:bg-charcoal hover:text-sand transition-colors"
                >
                  {t('products.clear_all', 'Clear All')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
