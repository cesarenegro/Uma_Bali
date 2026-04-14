import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../stores/productStore';

export default function CollectionsIndexPage() {
  const { t } = useTranslation('common');
  const categories = useProductStore((state) => state.categories);

  return (
    <div className="min-h-screen text-charcoal" style={{ backgroundColor: '#eeead7' }}>
      {/* Hero Header */}
      <section className="relative py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-4">
          {t('nav.collections')}
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl opacity-80">
          Discover our curated categories. From robust teak cabinetry to minimalist architectural seating designed for modern living.
        </p>
      </section>

      {/* Categories Grid */}
      <section className="px-6 md:px-12 pb-24 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/collections/${category.id}`}
              className="group relative h-[450px] overflow-hidden flex flex-col justify-end bg-sage/20 transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                {category.coverImage ? (
                  <img
                    src={category.coverImage}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-sage flex items-center justify-center opacity-50">
                    No Image
                  </div>
                )}
              </div>
              {/* Removed the large gradient overlay in favor of a clean banded strip */}
              <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm p-6 z-10 transform translate-y-0 text-center flex flex-col items-center border-t border-white/20 shadow-lg" style={{ backgroundColor: 'rgba(240, 240, 240, 0.65)' }}>
                <h3 className="text-3xl font-light tracking-wider capitalize" style={{ color: '#34322b' }}>
                  {t(`categories.${category.id.toLowerCase()}`, category.name)}
                </h3>
                <div className="h-0 overflow-hidden group-hover:h-8 transition-all duration-300 mt-2">
                  <span className="uppercase tracking-widest text-sm flex items-center justify-center gap-2" style={{ color: '#34322b', opacity: 0.8 }}>
                    {t('common.explore')} <span className="w-4 h-[1px] inline-block" style={{ backgroundColor: '#34322b' }}/>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
