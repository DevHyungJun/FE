export default function formatPrice(price: number): string {
  const priceResult = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${priceResult}원`;
}