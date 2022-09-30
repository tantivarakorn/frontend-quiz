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

			if (exitingProduct) {
				const sumExitingProductPrice =
					dlv(action, 'payload.product.data.attributes.price') *
					dlv(action, 'payload.quantity');

				exitingProduct.quantity += action.payload.quantity; //ตัวจำนวนตัวซ้ำ;
				state.totalPrice += sumExitingProductPrice;
			} else {
				state.productList.push(action.payload);
				state.totalProducts += 1;
				state.totalPrice += dlv(
					action,
					'payload.product.data.attributes.price'
				);
			}
		},
	},
});

export const { addToCart } = cartSlice.actions;
export const getCarts = (state: RootState) => state.carts;
export default cartSlice.reducer;
