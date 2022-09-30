import { createSlice } from '@reduxjs/toolkit';

export interface ICartSlice {
	product: any;
	quantity: number;
}

const initialState: ICartSlice[] = [
	{
		product: {},
		quantity: 0,
	},
];

export const cartSlice = createSlice({
	name: 'carts',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			console.log('state', state);
			console.log('action', action);
		},
	},
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
