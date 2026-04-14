import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function MaterialsPage() {
  const { t } = useTranslation('common');

  const teakColors = [
    { name: t('materials.natural_name'), description: t('materials.natural'), image: '/materials/teak_natural.png' },
    { name: t('materials.oiled_name'), description: t('materials.oiled'), image: '/materials/Teak_Oiled.png' },
    { name: t('materials.honey_name'), description: t('materials.honey'), image: '/materials/Teak_Honey2.png' },
    { name: t('materials.weathered_name'), description: t('materials.weathered'), image: '/materials/Teak_weathered.png' },
    { name: t('materials.grey_name'), description: t('materials.grey'), image: '/materials/Teak_Grey.png' },
    { name: t('materials.wenge_name'), description: t('materials.wenge'), image: '/materials/Teak_Wenge.png' }
  ];

  return (
    <div className="min-h-screen bg-[#eeead7] text-charcoal py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-light tracking-wide mb-8 text-center"
        >
          {t('materials.title')}
        </motion.h1>

        <section className="mb-16 text-center max-w-3xl mx-auto">
          <p className="text-lg opacity-80 leading-relaxed mb-6">
            {t('materials.intro')}
          </p>
          <div className="bg-[#e0d9b9]/50 p-6 inline-block shadow-sm">
            <h3 className="uppercase tracking-widest text-sm font-bold mb-2">{t('materials.varnish_title')}</h3>
            <p className="opacity-90 max-w-xl text-sm" dangerouslySetInnerHTML={{ __html: t('materials.varnish_desc').replace('Golden Care', '<strong>Golden Care</strong>') }} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light mb-8 text-center border-b border-charcoal/10 pb-4">{t('materials.finish_profiles')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teakColors.map((color, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={color.name} 
                className="bg-linen shadow-md group overflow-hidden"
              >
                {/* Visual Representation of Color */}
                <div className="h-48 w-full transition-transform duration-700 group-hover:scale-105 bg-white flex items-center justify-center p-4">
                  <img src={color.image} alt={color.name} className="w-full h-full object-contain" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-3 uppercase tracking-wider">{color.name}</h3>
                  <p className="text-sm opacity-80">{color.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
