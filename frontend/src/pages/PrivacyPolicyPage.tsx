import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-[#eeead7] text-charcoal py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-linen shadow-xl p-8 md:p-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-light tracking-wide mb-8 uppercase text-center border-b border-charcoal/10 pb-8"
        >
          {t('legal.privacy_title')}
        </motion.h1>
        <div className="prose prose-stone max-w-none text-charcoal/80 mt-8">
          <p className="lead text-lg mb-8">
            {t('legal.privacy_intro')}
          </p>

          <h2 className="text-xl font-medium text-charcoal mt-8 mb-4">{t('legal.data_controller')}</h2>
          <p>
            {t('legal.data_controller_desc')}
          </p>

          <h2 className="text-xl font-medium text-charcoal mt-8 mb-4">{t('legal.data_collection')}</h2>
          <p>{t('legal.data_collection_desc')}</p>
          <ul className="list-disc pl-6 mb-6">
            <li>{t('legal.data1')}</li>
            <li>{t('legal.data2')}</li>
            <li>{t('legal.data3')}</li>
          </ul>

          <h2 className="text-xl font-medium text-charcoal mt-8 mb-4">{t('legal.data_use')}</h2>
          <p>{t('legal.data_use_desc')}</p>

          <h2 className="text-xl font-medium text-charcoal mt-8 mb-4">{t('legal.data_rights')}</h2>
          <p>{t('legal.data_rights_desc')}</p>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal/10 flex justify-center gap-6">
          <Link to="/cookie-policy" className="text-sm tracking-widest uppercase hover:text-sage transition-colors">{t('common.cookie_policy')}</Link>
          <Link to="/terms-of-use" className="text-sm tracking-widest uppercase hover:text-sage transition-colors">{t('common.terms_of_use')}</Link>
        </div>
      </div>
    </div>
  );
}
