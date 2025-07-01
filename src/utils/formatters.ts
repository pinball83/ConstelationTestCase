export const formatMileage = (
  mileage: number,
  locale: string = 'en-GB',
): string => {
  return new Intl.NumberFormat(locale).format(mileage);
};

export const formatPrice = (
  price: number,
  currency: string = 'EUR',
  locale: string = 'en-GB',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
