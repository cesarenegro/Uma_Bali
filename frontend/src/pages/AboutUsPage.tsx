import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AboutUsPage() {
  const { t } = useTranslation('common');

  const images = [
    "https://www.arkitecna.com/images/europe/Montecarlo20260324_0085.png",
    "https://www.arkitecna.com/images/europe/Montecarlo20260324_0086.png",
    "https://www.arkitecna.com/images/europe/Montecarlo20260324_0087.png",
    "https://www.arkitecna.com/images/europe/Montecarlo20260324_0088.png",
    "https://www.arkitecna.com/images/europe/Montecarlo20260324_0089.png",
    "https://www.arkitecna.com/images/europe/Montecarlo20260324_0090.png",
    "https://www.arkitecna.com/images/fourseason.jpg",
    "https://www.arkitecna.com/images/D26G20BEACHCLUB.jpg",
    "https://www.arkitecna.com/images/METROPOLE20MC.jpg",
    "https://www.arkitecna.com/images/ANANTARA20BUDAPEST.jpg",
    "https://www.arkitecna.com/images/UMALAS20VILLA.jpg",
    "https://www.arkitecna.com/images/HYATT20KIEV.jpg"
  ];

  return (
    <div className="min-h-screen bg-[#eeead7] text-charcoal py-24 px-6 md:px-12 flex items-center">
      <div className="max-w-4xl mx-auto bg-linen shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Decorative Side Bar */}
        <div className="w-full md:w-1/3 bg-charcoal text-sand p-8 flex flex-col justify-between min-h-[500px]">
          <div className="grid grid-cols-2 gap-3 mb-8">
            {images.map((src, idx) => (
              <img key={idx} src={src} alt="Architecture details" className="w-full aspect-[4/3] object-cover opacity-80 hover:opacity-100 transition-opacity" />
            ))}
          </div>
          <div>
            <h2 className="text-3xl font-light tracking-widest uppercase mb-2">{t('about.since')}</h2>
            <p className="text-5xl font-serif">1959</p>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="w-full md:w-2/3 p-12 md:p-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-light tracking-wide mb-8 uppercase"
          >
            {t('about.title')}
          </motion.h1>

          <div className="space-y-6 text-charcoal/80 leading-relaxed text-lg">
            <p className="font-medium text-charcoal">
              {t('about.subtitle')}
            </p>
            
            <p>{t('about.p1')}</p>

            <p>{t('about.p2')}</p>

            <p>{t('about.p3')}</p>

            <p>{t('about.p4')}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-charcoal/10 flex gap-4">
            <Link to="/products" className="bg-charcoal text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-charcoal/80 transition-colors">
              {t('about.explore_collections')}
            </Link>
            <Link to="/projects" className="border border-charcoal text-charcoal px-6 py-3 uppercase tracking-widest text-sm hover:bg-charcoal hover:text-white transition-colors">
              {t('about.view_projects')}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
