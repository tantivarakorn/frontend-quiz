export const utils = {
	priceFormat: (price: string): string =>
		`${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
};
