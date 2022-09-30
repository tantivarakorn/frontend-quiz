import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import dlv from 'dlv';
import api from '../../../services/axios';

const ProductDetailComponent: React.FC = () => {
	const router = useRouter();
	const productId = dlv(router, 'query.productid');

	// useEffect(() => {
	// 	console.log('productId', productId);
	// 	if (!productId) return;
	// 	const getDetail = async () => {
	// 		try {
	// 			const { data } = await api.product.getDetailById(productId);
	// 			console.log('data', data);
	// 		} catch (error) {
	// 			console.log('error', error);
	// 		}
	// 	};
	// 	getDetail();
	// }, [productId]);

	return <h1>ProductDetailComponent productId : {productId}</h1>;
};

export default ProductDetailComponent;

// export async function getServerSideProps() {

// 	const appProps = await api.product.getDetailById(router)

// 	return {
// 		props: appProps.data,
// 	};
// }
