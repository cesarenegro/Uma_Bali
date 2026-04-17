// Base currency is CZK
// Exchange rates from 1 CZK
export const EXCHANGE_RATES: Record<string, number> = {
  EUR: 0.0388,
  USD: 0.0451,
  PLN: 0.165,
  CZK: 1.0,
};

// Language to Format Option
export const getCurrencyForLanguage = (language: string): string => {
  const langSubTag = language?.split('-')[0].toLowerCase() || 'en';
  
  if (['it', 'fr', 'hr'].includes(langSubTag)) return 'EUR';
  if (langSubTag === 'pl') return 'PLN';
  if (langSubTag === 'cs') return 'CZK';
  // All other languages default to USD
  return 'USD';
};

export const formatPrice = (priceInCzk: number | undefined, language: string): string => {
  if (priceInCzk === undefined || priceInCzk === null) return '';

  const currency = getCurrencyForLanguage(language);
  const rate = EXCHANGE_RATES[currency] || 1;
  const convertedPrice = priceInCzk * rate;
  
  let locale = 'en-US';
  if (currency === 'EUR') locale = 'it-IT';
  if (currency === 'PLN') locale = 'pl-PL';
  if (currency === 'CZK') locale = 'cs-CZ';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(convertedPrice);
};
