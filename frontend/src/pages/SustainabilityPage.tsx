import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function SustainabilityPage() {
  const { t } = useTranslation('common');
  return (
    <div className="min-h-screen bg-[#eeead7] text-charcoal py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-light tracking-wide mb-12 text-center"
        >
          {t('sustainability.title')}
        </motion.h1>

        <section className="mt-12 space-y-8 bg-linen/50 p-8 md:p-12 shadow-sm">
          <div>
            <h2 className="text-2xl font-light mb-4">{t('sustainability.t1_title')}</h2>
            <p className="text-lg opacity-80 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('sustainability.t1_desc').replace('100% FSC Certified', '<strong>100% FSC Certified</strong>').replace('SVLK certificate', '<strong>SVLK certificate</strong>') }} />
          </div>

          <div className="border-t border-charcoal/10 pt-8">
            <h2 className="text-2xl font-light mb-6">{t('sustainability.t2_title')}</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              {t('sustainability.t2_desc')}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#e0d9b9]/30 p-6">
                <h3 className="font-bold text-lg mb-2">{t('sustainability.grade3_title')}</h3>
                <p className="text-sm opacity-80">{t('sustainability.grade3_desc')}</p>
              </div>
              <div className="bg-[#e0d9b9]/60 p-6">
                <h3 className="font-bold text-lg mb-2">{t('sustainability.grade2_title')}</h3>
                <p className="text-sm opacity-80">{t('sustainability.grade2_desc')}</p>
              </div>
              <div className="bg-[#d4cdad] p-6 shadow-md border-l-4 border-charcoal">
                <h3 className="font-bold text-lg mb-2">{t('sustainability.grade1_title')}</h3>
                <p className="text-sm opacity-90">{t('sustainability.grade1_desc')}</p>
              </div>
            </div>

            <div className="bg-charcoal text-sand p-8 text-center mt-8">
              <h3 className="text-xl font-light tracking-wider uppercase mb-4">{t('sustainability.standard_title')}</h3>
              <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t('sustainability.standard_desc').replace('Teak Grade 1', '<strong>Teak Grade 1</strong>') }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
