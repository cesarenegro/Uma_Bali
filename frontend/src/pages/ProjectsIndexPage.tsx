import { useTranslation } from 'react-i18next';

export default function ProjectsIndexPage() {
  const { t } = useTranslation('common');

  const projects = [
    { title: "D&G BEACH CLUB - Marbella", img: "/images/projects/dolce_gabbana.jpg" },
    { title: "FOUR SEASON - Abu Dhabi", img: "/images/projects/fourseason.jpg" },
    { title: "METROPOL HOTEL - Montecarlo", img: "/images/projects/metropol.jpg" },
    { title: "LE MERIDIEN - Burkina Faso", img: "/images/projects/abudhabi1.png" },
    { title: "SHERATON - Chad", img: "/images/projects/chad.jpg" },
    { title: "PRIVATE VILLAS - Doha", img: "/images/projects/doha.png" },
    { title: "PRIVATE VILLA - Uluwatu", img: "/images/projects/uluwatu.png" },
    { title: "PRIVATE VILLA - Semynyak", img: "/images/projects/abudhabi2.png" },
    { title: "PRIVATE VILLA - Ubud", img: "/images/projects/montecarlo.png" },
    { title: "PRIVATE VILLA - Sanur", img: "/images/projects/sanur.jpg" },
    { title: "PRIVATE VILLA - Umalas", img: "/images/projects/umaals_villa.jpg" },
    { title: "Apartements - Canggu", img: "/images/projects/canggu.png" },
  ];

  return (
    <div className="min-h-screen text-charcoal bg-[#eeead7]">
      <section className="relative pt-24 pb-12 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-4">
          {t('nav.projects', 'Projects')}
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl opacity-80 mt-2">
          {t('projects.subtitle', 'A curated selection of our finest global architectural and interior design achievements.')}
        </p>
      </section>

      <section className="px-6 md:px-12 pb-24 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((proj, idx) => (
            <div key={idx} className="group relative flex flex-col overflow-hidden bg-white/30 border border-white/20 shadow-sm transition-transform duration-500 hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden relative bg-[#eeead7]">
                <img 
                  src={proj.img} 
                  alt={proj.title} 
                  className="w-full h-full object-cover transition-all duration-700 grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-sage/40 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0 pointer-events-none z-10"></div>
              </div>
              
              <div className="p-5 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm border-t border-white/30 text-center flex-grow transition-colors duration-300 group-hover:bg-white/80">
                <h3 className="text-[13px] font-semibold tracking-wider uppercase text-charcoal/90">
                  {proj.title}
                </h3>
                <div className="w-8 h-[1px] bg-charcoal/30 mt-3 transition-w duration-300 group-hover:w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
