import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation('common');

  const navLinks = [
    { label: t('nav.products'), href: '/products' },
    { label: t('nav.collections'), href: '/collections' },
    { label: t('nav.designers'), href: '/designers' },
    { label: t('nav.projects'), href: '/projects' },
    { label: t('nav.ai_generator'), href: '/ai-generator' },
    { label: t('nav.about_us') || 'About Us', href: '/about-us' },
  ];

  return (
    <header className="border-b border-travertine bg-linen sticky top-0 z-50">
      <div className="flex justify-between items-center py-2 px-6 border-b border-dune bg-dune">
        <div className="flex gap-4">
          <select 
            value={i18n.language} 
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-transparent text-espresso text-caption outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="cs">Čeština</option>
            <option value="de">Deutsch</option>
            <option value="pl">Polski</option>
          </select>
        </div>
        <div className="flex gap-4 text-caption text-textPrimary">
          <Link to="/contact">{t('nav.contact', 'Contact')}</Link>
          <Link to="/account">{t('common.login_account', 'Login / Account')}</Link>
        </div>
      </div>
      <div className="flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-h2 font-heading font-medium text-espresso uppercase tracking-wider">
          UMA BALI
        </Link>
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-nav text-espresso hover:text-brand transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
