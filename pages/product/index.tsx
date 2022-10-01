import { NextPage } from 'next';
import { Fragment } from 'react';
import ProductComponent from '../../components/product';

export interface IProductData {
	data?: IProduct[];
	meta?: {
		pagination: {
			total: number;
		};
	};
}

export interface IProduct {
	id?: number;
	attributes?: {
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
	return (
		<Fragment>
			<ProductComponent />
		</Fragment>
	);
};
export default ProductPage;
