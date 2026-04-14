import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroVideoPopup() {
  const [showPopup, setShowPopup] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [textStage, setTextStage] = useState(0);

  useEffect(() => {
    // Stage 1: "FROM BALI" appears after 500ms
    const timer1 = setTimeout(() => setTextStage(1), 500);
    // Stage 2: "TO YOUR HOME" appears after 2000ms
    const timer2 = setTimeout(() => setTextStage(2), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleVideoEnded = () => {
    setVideoEnded(true);
    // Wait an additional 1s after video ends to close
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };

  // Skip video if user clicks
  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
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
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none tracking-[0.2em]">
          <h1 className="text-white font-bold text-4xl md:text-6xl lg:text-7xl uppercase flex flex-col gap-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: textStage >= 1 ? 1 : 0, y: textStage >= 1 ? 0 : 10 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              FROM BALI
            </motion.span>
            
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: textStage >= 2 ? 1 : 0, y: textStage >= 2 ? 0 : 10 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              TO YOUR HOME
            </motion.span>
          </h1>
        </div>

        {/* Skip instruction */}
        <div className="absolute bottom-10 left-0 right-0 text-center text-white/50 text-sm tracking-widest uppercase">
          Click anywhere to skip
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
