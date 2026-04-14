import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation('common');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-espresso overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url(/images/hero/Lounge_Pool.png)' }}
        />
        <div className="relative z-10 text-center text-linen px-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="heading-display text-hero uppercase tracking-widest mb-6 text-[#f5f3eb]"
          >
            {t('home.hero_title')}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body-large text-sand max-w-2xl mx-auto mb-10"
          >
            {t('home.hero_subtitle')}
            <br />
            {t('home.footer_description')}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link to="/products" className="btn-primary">
              {t('home.explore_range')}
            </Link>
            <Link to="/ai-generator" className="btn-secondary text-linen border-linen hover:bg-linen hover:text-espresso">
              {t('nav.ai_generator')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="heading-h2 text-espresso mb-12 text-center">{t('home.featured_collections')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: t('categories.sunloungers'), img: '/images/hero/Lounge_Pool.png' },
            { title: t('categories.tables-bars'), img: '/images/hero/Untitled-5.png' },
            { title: t('categories.sofa-benches'), img: '/images/hero/Lounge_Pool.png' }
          ].map((cat, i) => (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              key={i} 
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-travertine">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${cat.img})` }}
                />
              </div>
              <h3 className="heading-h3 text-espresso border-b border-travertine pb-4 mb-2">
                {cat.title}
              </h3>
              <span className="text-caption text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                {t('common.discover')}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-linen py-24 px-6 border-y border-travertine">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-caption text-stone uppercase tracking-widest block mb-4">{t('home.philosophy_title')}</span>
            <h2 className="heading-h2 text-espresso mb-6">{t('home.philosophy_subtitle')}</h2>
            <p className="body-base text-stone mb-8">
              {t('home.philosophy_desc', 'UMA BALI bridges the gap between indoor luxury and outdoor resilience. Our pieces are crafted using state-of-the-art materials that withstand the elements without compromising on the elegant aesthetics of high-end interior design.')}
            </p>
            <Link to="/about-us" className="text-brand font-medium hover:underline flex items-center gap-2 text-nav">
              {t('nav.about_us')} →
            </Link>
          </div>
          <div className="relative w-full">
            <img src="/images/hero/cn_mgm_mrp.png" alt="UMA BALI Philosophy" className="w-full h-auto drop-shadow-md" />
          </div>
        </div>
      </section>
    </div>
  );
}
