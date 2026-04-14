import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroVideoPopup() {
  const [showPopup, setShowPopup] = useState(true);
  const [textStage, setTextStage] = useState(0);

  useEffect(() => {
    // Stage 1: "FROM BALI" appears after 500ms
    const timer1 = setTimeout(() => setTextStage(1), 500);
    // Stage 2: "TO YOUR HOME" appears after 2000ms
    const timer2 = setTimeout(() => setTextStage(2), 2500);
    // Stage 3: Text fades out after 5500ms
    const timer3 = setTimeout(() => setTextStage(3), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleVideoEnded = () => {
    // In case video finishes before textStage 3
    setTextStage(3);
    // Wait an additional 1s after video ends to close
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };

  // Skip video if user clicks
  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={handleClose}
        >
          <video 
            src="/videos/intro.mp4" 
            autoPlay 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
            onEnded={handleVideoEnded}
          />
          
          {/* Cinematic dark overlay top layer (approx 12% black transparency) */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          {/* Text Animation Overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none tracking-[0.1em]">
            <h1 className="text-[#efebda] font-bold text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] uppercase flex flex-col gap-2 md:gap-6 leading-none">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: textStage >= 1 && textStage < 3 ? 1 : 0, 
                  y: textStage === 0 ? 10 : (textStage >= 3 ? -10 : 0) 
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                FROM BALI
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: textStage >= 2 && textStage < 3 ? 1 : 0, 
                  y: textStage < 2 ? 10 : (textStage >= 3 ? -10 : 0) 
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                TO YOUR HOME
              </motion.span>
            </h1>
            
            <motion.img
              src="/images/logo.png"
              alt="UMA BALI Logo"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ 
                scale: textStage >= 3 ? 1.1 : 1, 
                opacity: textStage >= 3 ? 0 : 1 
              }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="mt-[5pt] h-64 md:h-80 lg:h-[26rem] w-auto object-contain brightness-0 invert opacity-90"
            />
          </div>

          {/* Skip instruction */}
          <div className="absolute bottom-10 left-0 right-0 text-center text-[#efebda]/50 text-sm md:text-base tracking-widest uppercase">
            Click anywhere to skip
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
