import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AboutUsPage() {
  const { t } = useTranslation('common');
  const [activeImage, setActiveImage] = useState<{src: string, title: string} | null>(null);

  const images = [
    { src: "https://www.arkitecna.com/images/europe/Montecarlo20260324_0085.png", title: "Montecarlo Project" },
    { src: "https://www.arkitecna.com/images/europe/Montecarlo20260324_0086.png", title: "Montecarlo Project" },
    { src: "https://www.arkitecna.com/images/europe/Montecarlo20260324_0087.png", title: "Montecarlo Project" },
    { src: "https://www.arkitecna.com/images/europe/Montecarlo20260324_0088.png", title: "Montecarlo Project" },
    { src: "https://www.arkitecna.com/images/europe/Montecarlo20260324_0089.png", title: "Montecarlo Project" },
    { src: "https://www.arkitecna.com/images/europe/Montecarlo20260324_0090.png", title: "Montecarlo Project" },
    { src: "https://www.arkitecna.com/images/fourseason.jpg", title: "Four Seasons" },
    { src: "https://www.arkitecna.com/images/D26G20BEACHCLUB.jpg", title: "Beach Club" },
    { src: "https://www.arkitecna.com/images/METROPOLE20MC.jpg", title: "Metropole Monte-Carlo" },
    { src: "https://www.arkitecna.com/images/ANANTARA20BUDAPEST.jpg", title: "Anantara Budapest" },
    { src: "https://www.arkitecna.com/images/UMALAS20VILLA.jpg", title: "Umalas Villa" },
    { src: "https://www.arkitecna.com/images/HYATT20KIEV.jpg", title: "Hyatt Kiev" }
  ];

  return (
    <>
      <div className="min-h-screen bg-[#eeead7] text-charcoal py-24 px-6 md:px-12 flex items-center">
        <div className="max-w-4xl mx-auto bg-linen shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Decorative Side Bar */}
          <div className="w-full md:w-1/3 bg-charcoal text-sand p-12 md:p-16 flex flex-col">
            {/* Invisible spacer matching the right column's title height for perfect alignment */}
            <div 
              className="text-3xl md:text-4xl font-light tracking-wide mb-8 uppercase invisible"
              aria-hidden="true"
            >
              {t('about.title')}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-auto">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="cursor-pointer overflow-hidden group"
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img.src} alt={img.title} className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-sand/20 pt-6">
              <h2 className="text-xl font-light tracking-widest uppercase mb-1">{t('about.since')}</h2>
              <p className="text-4xl font-serif">1959</p>
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

      {/* Lightbox Pop-up */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12 animate-in fade-in duration-300">
          <button 
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative max-w-7xl max-h-full flex flex-col items-center">
            <img 
              src={activeImage.src} 
              alt={activeImage.title} 
              className="max-h-[75vh] w-auto object-contain shadow-2xl rounded-sm" 
            />
            <div className="mt-8 px-6 py-3 bg-white/5 border border-white/10 rounded-sm">
              <h3 className="text-white/90 text-xl font-light tracking-widest uppercase">
                {activeImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
