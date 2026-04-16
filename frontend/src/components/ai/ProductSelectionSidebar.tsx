import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../../stores/productStore';
import { useAIStore } from '../../stores/aiStore';

export default function ProductSelectionSidebar() {
  const { t } = useTranslation('common');
  const { products, categories } = useProductStore();
  const { selectedProducts, addProduct, removeProduct } = useAIStore();
  
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || 'sofa');

  // Filter products by active category
  const displayProducts = useMemo(() => {
    let filtered = [];
    if (activeCategory === 'quick-ship-program') {
      filtered = products.filter(p => p.tags?.includes('quick-ship'));
    } else {
      filtered = products.filter(p => p.category === activeCategory);
    }
    
    // Sort so items with images are preferred
    filtered.sort((a, b) => {
      if (a.images.length > 0 && b.images.length === 0) return -1;
      if (a.images.length === 0 && b.images.length > 0) return 1;
      return 0;
    });
    return filtered;
  }, [products, activeCategory]);

  const toggleProduct = (product: any) => {
    const isSelected = selectedProducts.some(p => p.id === product.id);
    if (isSelected) {
      removeProduct(product.id);
    } else {
      addProduct({
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.images[0] || ''
      });
    }
  };

  return (
    <div className="w-full lg:w-80 bg-white border-r border-charcoal/10 h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-charcoal/10 bg-sand/30">
        <h2 className="text-xl font-light text-charcoal">{t('ai.select_products', 'Select Furniture')}</h2>
        <p className="text-sm text-charcoal/60 mt-1">Choose up to 5 items</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 p-4 border-b border-charcoal/10 bg-sand/10">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-colors
              ${activeCategory === cat.id 
                ? 'border-sage bg-sage text-white font-medium shadow-sm' 
                : 'border-charcoal/20 bg-white text-charcoal/60 hover:text-charcoal hover:border-charcoal/40'}`}
          >
            {t(`categories.${cat.id.toLowerCase()}`, cat.name)}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {displayProducts.map(product => {
          const isSelected = selectedProducts.some(p => p.id === product.id);
          const imageSrc = product.images[0] || '/placeholder.png'; // fallback
          
          return (
            <div 
              key={product.id}
              onClick={() => toggleProduct(product)}
              className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-sage bg-sage/5 ring-1 ring-sage/20' 
                  : 'border-charcoal/10 bg-white hover:border-charcoal/20'}`}
            >
              <div className="w-16 h-16 rounded bg-sand/50 overflow-hidden flex-shrink-0">
                <img src={imageSrc} alt={product.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-charcoal truncate">{product.name}</h4>
                <p className="text-xs text-charcoal/60 capitalize mt-0.5">{product.category}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0
                ${isSelected ? 'border-sage bg-sage text-white' : 'border-charcoal/20 bg-transparent'}`}>
                {isSelected && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
