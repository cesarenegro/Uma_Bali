import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const countryToLang: Record<string, string> = {
  IT: 'it', // Italy
  FR: 'fr', // France
  MC: 'fr', // Monaco
  DE: 'de', // Germany
  AT: 'de', // Austria
  CH: 'de', // Switzerland
  PL: 'pl', // Poland
  CZ: 'cs', // Czech Republic
  HR: 'hr', // Croatia
  // other countries will fallback to the browser setting natively detected by i18next
};

export function useAutoLanguage() {
  const { i18n } = useTranslation();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const checkIPLocation = async () => {
      // If we already performed IP detection or if user manually changed language, do not run again.
      // i18next-browser-languagedetector might set i18nextLng on load, but we can track our own flag:
      if (localStorage.getItem('ip_lang_detected')) return;

      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          const mappedLang = countryToLang[data.country_code];
          
          if (mappedLang) {
            i18n.changeLanguage(mappedLang);
          }
        }
      } catch (err) {
        console.warn('IP lang detection error:', err);
      } finally {
        localStorage.setItem('ip_lang_detected', 'true');
      }
    };

    checkIPLocation();
  }, [i18n]);
}
