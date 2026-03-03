export function getDiscountPercent(price: number, discountedPrice: number) {
	if (!price || discountedPrice >= price) return 0;
	return Math.round(((price - discountedPrice) / price) * 100);
}
