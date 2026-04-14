import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className="bg-espresso text-linen pt-16 pb-8 px-6 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h2 className="heading-display text-h3 mb-4">UMA BALI</h2>
          <p className="caption text-stone">
            {t('footer.description')}
          </p>
        </div>
        <div>
          <h4 className="heading-h3 text-sand mb-4">{t('footer.company')}</h4>
          <ul className="space-y-2 text-caption">
            <li><Link to="/about-us" className="hover:text-teak transition-colors">{t('nav.about_us')}</Link></li>
            <li><Link to="/sustainability" className="hover:text-teak transition-colors">{t('nav.sustainability')}</Link></li>
            <li><Link to="/materials" className="hover:text-teak transition-colors">{t('nav.materials')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="heading-h3 text-sand mb-4">{t('footer.support')}</h4>
          <ul className="space-y-2 text-caption">
            <li><Link to="/contact" className="hover:text-teak transition-colors">{t('nav.contact')}</Link></li>
            <li><Link to="/showrooms" className="hover:text-teak transition-colors">{t('nav.showrooms')}</Link></li>
            <li><Link to="/catalogues" className="hover:text-teak transition-colors">{t('nav.catalogues')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="heading-h3 text-sand mb-4">{t('footer.newsletter')}</h4>
          <p className="caption text-stone mb-4">{t('footer.newsletter_desc')}</p>
          <div className="flex">
            <input type="email" placeholder={t('footer.your_email')} className="bg-linen text-espresso px-4 py-2 w-full outline-none" />
            <button className="bg-teak text-linen px-4 py-2 hover:bg-bark transition-colors font-medium">{t('footer.subscribe')}</button>
          </div>
        </div>
      </div>
      <div className="divider opacity-20 mb-8" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-caption text-stone">
        <p>&copy; {new Date().getFullYear()} UMA BALI. {t('footer.all_rights_reserved')}</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/privacy-policy" className="hover:text-linen transition-colors">{t('footer.privacy')}</Link>
          <Link to="/cookie-policy" className="hover:text-linen transition-colors">{t('footer.cookie')}</Link>
          <Link to="/terms-of-use" className="hover:text-linen transition-colors">{t('footer.terms')}</Link>
        </div>
      </div>
    </footer>
  );
}
