export function formatMoney(value: number) {
	return new Intl.NumberFormat('nb-NO', {
		style: 'currency',
		currency: 'NOK',
	}).format(value);
}
