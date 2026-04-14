import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TermsOfUsePage() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-[#eeead7] text-charcoal py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-linen shadow-xl p-8 md:p-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-light tracking-wide mb-8 uppercase text-center border-b border-charcoal/10 pb-8"
        >
          {t('footer.terms')}
        </motion.h1>

        <div className="prose prose-stone max-w-none text-charcoal/80 mt-8">
          <p className="lead text-lg mb-8">
            {t('legal.terms_intro')}
          </p>

          <h2 className="text-xl font-medium text-charcoal mt-8 mb-4">{t('legal.terms_property')}</h2>
          <p>{t('legal.terms_property_desc')}</p>

          <h2 className="text-xl font-medium text-charcoal mt-8 mb-4">{t('legal.terms_user_rep')}</h2>
          <p>{t('legal.terms_user_rep_desc')}</p>

          <h2 className="text-xl font-medium text-charcoal mt-8 mb-4">{t('legal.terms_prohibited')}</h2>
          <p>{t('legal.terms_prohibited_desc')}</p>

          <h2 className="text-xl font-medium text-charcoal mt-8 mb-4">{t('legal.terms_law')}</h2>
          <p>{t('legal.terms_law_desc')}</p>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal/10 flex justify-center gap-6">
          <Link to="/privacy-policy" className="text-sm tracking-widest uppercase hover:text-sage transition-colors">{t('footer.privacy')}</Link>
          <Link to="/cookie-policy" className="text-sm tracking-widest uppercase hover:text-sage transition-colors">{t('footer.cookie')}</Link>
        </div>
      </div>
    </div>
  );
}
