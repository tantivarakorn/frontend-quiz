import { NextPage } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ProductComponent from '../../components/product';

import api from '../../services/axios';
import { RootState } from '../../stores';

export interface IProductData {
	data?: IProduct[];
	meta?: {
		pagination: {
			total: number;
		};
	};
}

export interface IProduct {
	id: number;
	attributes: {
		description: string;
		image_url: string;
		name: string;
		price: number;
		review: {
			number: number;
			rating: number;
		};
		brand: {
			data: {
				attributes: {
					logo_url: string;
					name: string;
				};
			};
		};
	};
}

const ProductPage: NextPage<IProductData> = (data) => {
	// const carts = useSelector((state: RootState) => state.carts);
	// console.log('carts', carts);

	// console.log('ProductPage data', data);

	return (
		<Fragment>
			<ProductComponent products={data} />
		</Fragment>
	);
};
export default ProductPage;

export async function getServerSideProps() {
	const appProps = await api.product.get();

	return {
		props: appProps.data,
	};
}
