import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation('common');
  // Use first image or a placeholder
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : '/placeholder-furniture.jpg';
  
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
        <Link to={`/product/${product.id}`} className="text-body font-medium text-espresso hover:text-brand transition-colors capitalize">
          {product.name}
        </Link>
        <p className="text-caption text-stone mt-1 line-clamp-2">{product.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {product.materials && product.materials.slice(0, 3).map(mat => (
            <span key={mat} className="text-tiny bg-linen text-stone px-2 py-1 rounded-sm border border-travertine">
              {mat}
            </span>
          ))}
          {product.materials && product.materials.length > 3 && (
            <span className="text-tiny text-stone px-2 py-1">+{product.materials.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
