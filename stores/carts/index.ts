import { RootState } from './../index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductDetail } from '../../components/product/detail';
import dlv from 'dlv';

export interface ICartSlice {
	product: IProductDetail;
	quantity: number;
}

export interface IInitialState {
	productList?: ICartSlice[];
	totalProducts?: number;
	totalPrice: number;
}
const initialState = {
	productList: [] as ICartSlice[],
	totalProducts: 0,
	totalPrice: 0,
};

export const cartSlice = createSlice({
	name: 'carts',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ICartSlice>) => {
			const exitingProduct = state.productList.find(
				(prod: ICartSlice) =>
					prod.product.data?.id ===
					dlv(action, 'payload.product.data.id')
			);

			const sumProductPrice =
				dlv(action, 'payload.product.data.attributes.price') *
				dlv(action, 'payload.quantity');
			if (exitingProduct) {
				exitingProduct.quantity += action.payload.quantity; //ตัวจำนวนตัวซ้ำ;
				state.totalPrice += sumProductPrice;
			} else {
				state.productList.push(action.payload);
				state.totalProducts += 1;
				state.totalPrice += sumProductPrice;
			}
		},
	},
});

export const { addToCart } = cartSlice.actions;
export const getCarts = (state: RootState) => state.carts;
export default cartSlice.reducer;
