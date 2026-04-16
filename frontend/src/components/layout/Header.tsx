import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../../stores/productStore';
import { useAudioStore } from '../../stores/audioStore';

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const { cartItems, toggleCart, searchQuery, setSearch } = useProductStore();
  const { isPlaying, toggleAudio } = useAudioStore();
  const navigate = useNavigate();
  
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: t('nav.products'), href: '/products' },
    { label: t('nav.collections'), href: '/collections' },
    { label: t('nav.materials') || 'Materials', href: '/materials' },
    { label: t('nav.designers'), href: '/designers' },
    { label: t('nav.projects'), href: '/projects' },
    { label: t('nav.ai_generator'), href: '/ai-generator' },
    { label: t('nav.about_us') || 'About Us', href: '/about-us' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
    }
  };

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
          <Link to="/e-shop" className="hover:text-brand transition-colors">{t('nav.eshop', 'E-Shop')}</Link>
          <Link to="/contact" className="hover:text-brand transition-colors">{t('nav.contact', 'Contact')}</Link>
          <Link to="/account" className="hover:text-brand transition-colors">{t('common.login_account', 'Login / Account')}</Link>
        </div>
      </div>
      <div className="flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center gap-3 text-h2 font-heading font-medium text-espresso uppercase tracking-wider">
          <img src="/images/logo.png" alt="Uma Bali Logo" className="h-10 w-auto" />
          UMA BALI
        </Link>
        
        <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input 
              type="text" 
              placeholder={t('common.search', 'Search...')}
              value={searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/50 border border-travertine focus:border-stone outline-none rounded-sm px-3 py-1.5 text-caption text-espresso placeholder-stone/70 w-40 lg:w-48 transition-all focus:bg-white focus:w-48 lg:focus:w-56"
            />
            <button type="submit" className="absolute right-2 text-stone hover:text-espresso transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>

          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-nav text-espresso hover:text-brand transition-colors">
              {link.label}
            </Link>
          ))}
          
          <button onClick={() => toggleAudio()} className="relative text-espresso hover:text-brand transition-colors p-1 ml-2" title={isPlaying ? "Pause Music" : "Play Music"}>
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            )}
          </button>

          <button onClick={() => toggleCart()} className="relative text-espresso hover:text-brand transition-colors p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-brand text-linen text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {cartItemsCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
