import { Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../shop/CartDrawer';
import { useAudioStore } from '../../stores/audioStore';
import { useAutoLanguage } from '../../hooks/useAutoLanguage';

export default function RootLayout() {
  useAutoLanguage();
  const { isPlaying } = useAudioStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log('Audio play failed (autoplay restriction):', e);
          // Wait for first user interaction to unlock audio
          const playOnInteraction = () => {
            if (useAudioStore.getState().isPlaying && audioRef.current) {
              audioRef.current.play().catch(err => console.log('Final audio play error:', err));
            }
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
          };
          document.addEventListener('click', playOnInteraction);
          document.addEventListener('touchstart', playOnInteraction);
          document.addEventListener('keydown', playOnInteraction);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col min-h-screen bg-bgPrimary text-textPrimary font-body relative">
      <audio ref={audioRef} src="/audio/bg-music.mp3" loop />
      
      {/* Example Top Banner */}
      <div className="bg-espresso text-linen text-center py-2 text-caption">
        Welcome to UMA BALI. Shipping worldwide.
      </div>
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
