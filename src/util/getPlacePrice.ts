export const getPlacePrice = (minPrice: number, maxPrice: number) => {
  if (minPrice === maxPrice) {
    return minPrice.toLocaleString();
  }
  return `${minPrice.toLocaleString()}~${maxPrice.toLocaleString()}`;
};
