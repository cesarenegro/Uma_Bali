import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../hooks/useCurrency';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t, i18n } = useTranslation('common');
  const lang = i18n.language?.split('-')[0].toLowerCase() || 'en';
  const tr = product.translations?.[lang] || {};
  const name = tr.name || product.name || '';
  const desc = tr.description || product.description || '';
  const mats = tr.materials || product.materials || [];
  const { format } = useCurrency();
  // Prefer Natural or Honey Teak variants for display
  const getDefaultImage = (images: string[] | undefined) => {
    if (!images || images.length === 0) return '/placeholder-furniture.jpg';
    const preferred = images.find(img => {
      const l = img.toLowerCase();
      return l.includes('natural') || l.includes('honey');
    });
    return preferred || images[0];
  };
  const imageUrl = getDefaultImage(product.images);
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col"
    >
      {/* Use id instead of slug, as JSON keys off 'id' */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-[#f8f6ef] mb-4">
        <div 
          className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-700 group-hover:scale-105 mix-blend-darken"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-sage text-linen text-caption px-2 py-1 uppercase tracking-widest">
            {t('common.new', 'New')}
          </span>
        )}
      </Link>
      
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product.id}`} className="text-body font-medium text-espresso hover:text-brand transition-colors capitalize">
            {name}
          </Link>
          <div className="flex flex-col items-end gap-1">
            <span className="text-caption font-medium text-stone tracking-wide bg-travertine/30 px-2 py-0.5 rounded-sm">
              {product.id}
            </span>
            {product.price !== undefined && (
              <span className="font-bold text-espresso text-sm whitespace-nowrap">
                {format(product.price)}
              </span>
            )}
          </div>
        </div>
        <p className="text-caption text-stone line-clamp-2 mt-2">{desc}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {mats && mats.slice(0, 3).map(mat => (
            <span key={mat} className="text-tiny bg-linen text-stone px-2 py-1 rounded-sm border border-travertine">
              {mat}
            </span>
          ))}
          {mats && mats.length > 3 && (
            <span className="text-tiny text-stone px-2 py-1">+{mats.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
