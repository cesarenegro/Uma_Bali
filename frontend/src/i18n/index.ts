import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import csCommon from './locales/cs/common.json';
import deCommon from './locales/de/common.json';
import plCommon from './locales/pl/common.json';
import itCommon from './locales/it/common.json';
import frCommon from './locales/fr/common.json';
import hrCommon from './locales/hr/common.json';

const resources = {
  en: { common: enCommon },
  cs: { common: csCommon },
  de: { common: deCommon },
  pl: { common: plCommon },
  it: { common: itCommon },
  fr: { common: frCommon },
  hr: { common: hrCommon }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'cs', 'de', 'pl', 'it', 'fr', 'hr'],
    ns: ['common'],
    defaultNS: 'common',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
