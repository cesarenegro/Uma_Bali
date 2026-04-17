import { useTranslation } from 'react-i18next';
import { formatPrice } from '../lib/currency';

export function useCurrency() {
  const { i18n } = useTranslation();
  
  const format = (priceInCzk: number | undefined): string => {
    return formatPrice(priceInCzk, i18n.language);
  };

  return { format };
}
