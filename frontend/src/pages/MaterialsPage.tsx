import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function MaterialsPage() {
  const { t } = useTranslation('common');

  const teakColors = [
    { name: t('materials.natural_name'), description: t('materials.natural'), image: '/materials/teak_natural.png' },
    { name: t('materials.oiled_name'), description: t('materials.oiled'), image: '/materials/Teak_Oiled.png' },
    { name: t('materials.honey_name'), description: t('materials.honey'), image: '/materials/Teak_Honey2.png' },
    { name: t('materials.weathered_name'), description: t('materials.weathered'), image: '/materials/Teak_weathered.png' },
    { name: t('materials.grey_name'), description: t('materials.grey'), image: '/materials/Teak_Grey.png' },
    { name: t('materials.wenge_name'), description: t('materials.wenge'), image: '/materials/Teak_Wenge.png' }
  ];

  const removeExt = (filename: string) => filename.replace(/\.[^/.]+$/, "");

  const sunbrella = [
    "42082-0025_96566533_1200.jpg",
    "44157-0053_85686795_1200.jpg",
    "48086-0000_53579480_1200.jpg",
    "64231-0001_96839256_1200.jpg",
    "145654-0003_81541326_1200.jpg",
    "146205-0002_132104831_1200.jpg",
    "146206-0001_132104924_1200.jpg",
    "146206-0002_132919585_1200.jpg",
    "CDN_1200-Boro-Indigo_146030-0002-tif.jpg",
    "CDN_1200-Dream-Mist_146395-0001-tif.jpg",
    "CDN_1200-Eberly-Peacock_146266-0003-tif.jpg",
    "CDN_1200-Fernie-Mimosa_64280-0001.jpg",
    "CDN_1200-Hound-Midnight_305674-0004.jpg",
    "CDN_1200-Precise-Spring_145602-0007.jpg",
    "Colorwash-Foggy_73079-0001_cus.jpg"
  ];

  const sunproof = [
    "bluebay_040-1024x1024.jpg",
    "bluebay_142-1024x1024.jpg",
    "bluebay_160-1024x1024.jpg",
    "bluebay_162-1024x1024.jpg",
    "calasaona_070-1024x1024.jpg",
    "calasaona_091-1024x1024.jpg",
    "calasaona_142-1024x1024.jpg",
    "laconcha_101-1024x1024.jpg",
    "laconcha_140-1024x1024.jpg",
    "laconcha_162-1024x1024.jpg",
    "laconcha_182-1024x1024.jpg",
    "liestal_135-1024x1024.jpg",
    "southbeach_164-1024x1024.jpg",
    "southbeach_165-1024x1024.jpg"
  ];

  const jimThompson = [
    "0ace812f-05b4-456a-ac9e-ca13e7c7274a.jpg",
    "0c2c2042-ffcc-4d03-be45-5721bf7de6cd.jpg",
    "7b4e25d0-421b-4655-a9ea-8df1740647a3.jpg",
    "33c618ae-4ccb-48c4-8785-649a8981fa94.jpg",
    "54ba32af-d6ee-44c6-8a25-f6cbb1deb485.jpg",
    "97c4c8bb-bc62-4d6b-91b1-1b0af8c30e0f.jpg",
    "517ec2d8-edc2-45dc-95d2-6f8708a5d0e3.jpg",
    "cd5d3f92-82ba-4ca9-b752-18d8939009fb.jpg",
    "d7350690-fd33-4842-a52d-132610ff7ffe.jpg",
    "331c8f94-a488-4de8-a260-04736d552796.jpg",
    "cd5d3f92-82ba-4ca9-b752-18d8939009fb.jpg",
    "d7350690-fd33-4842-a52d-132610ff7ffe.jpg",
    "dedab54a-12ac-4673-a7cd-9799fee80b8d.jpg",
    "e7673108-46fa-431f-b1d4-aea81c22ee5e.jpg",
    "f93a7ebd-bb49-46dc-802e-94b4f79704ee.jpg"
  ];

  return (
    <div className="min-h-screen bg-[#eeead7] text-charcoal py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-light tracking-wide mb-8 text-center"
        >
          {t('materials.title')}
        </motion.h1>

        <section className="mb-16 text-center max-w-3xl mx-auto">
          <p className="text-lg opacity-80 leading-relaxed mb-6">
            {t('materials.intro')}
          </p>
          <div className="bg-[#e0d9b9]/50 p-6 inline-block shadow-sm">
            <h3 className="uppercase tracking-widest text-sm font-bold mb-2">{t('materials.varnish_title')}</h3>
            <p className="opacity-90 max-w-xl text-sm" dangerouslySetInnerHTML={{ __html: t('materials.varnish_desc').replace('Golden Care', '<strong>Golden Care</strong>') }} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light mb-8 text-center border-b border-charcoal/10 pb-4">{t('materials.finish_profiles')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teakColors.map((color, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={color.name} 
                className="bg-linen shadow-md group overflow-hidden"
              >
                {/* Visual Representation of Color */}
                <div className="h-48 w-full transition-transform duration-700 group-hover:scale-105 bg-white flex items-center justify-center p-4">
                  <img src={color.image} alt={color.name} className="w-full h-full object-contain" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-3 uppercase tracking-wider">{color.name}</h3>
                  <p className="text-sm opacity-80">{color.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sunbrella Section */}
        <section className="mt-24">
          <h2 className="text-2xl font-light mb-8 text-center border-b border-charcoal/10 pb-4 uppercase tracking-widest">Sunbrella - Original USA Fabric</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {sunbrella.map((file, idx) => (
              <div key={idx} className="relative group overflow-hidden bg-white shadow-sm aspect-square flex flex-col">
                <img src={`/materials/sunbrella/${file}`} alt={removeExt(file)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full bg-charcoal/80 p-2 text-center backdrop-blur-sm">
                  <span className="text-white text-[10px] sm:text-xs tracking-wider break-words">{removeExt(file)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sunproof Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-light mb-8 text-center border-b border-charcoal/10 pb-4 uppercase tracking-widest">Sunproof Outdoor</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {sunproof.map((file, idx) => (
              <div key={idx} className="relative group overflow-hidden bg-white shadow-sm aspect-square flex flex-col">
                <img src={`/materials/sunproof/${file}`} alt={removeExt(file)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full bg-charcoal/80 p-2 text-center backdrop-blur-sm">
                  <span className="text-white text-[10px] sm:text-xs tracking-wider break-words">{removeExt(file)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Jim Thompson Section */}
        <section className="mt-20 mb-12">
          <h2 className="text-2xl font-light mb-8 text-center border-b border-charcoal/10 pb-4 uppercase tracking-widest">Jim Thompson Premium</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {jimThompson.map((file, idx) => (
              <div key={idx} className="relative group overflow-hidden bg-white shadow-sm aspect-square flex flex-col">
                <img src={`/materials/jim_thompson/${file}`} alt={removeExt(file)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full bg-charcoal/80 p-2 text-center backdrop-blur-sm">
                  <span className="text-white text-[10px] sm:text-xs tracking-wider break-words">{removeExt(file)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
