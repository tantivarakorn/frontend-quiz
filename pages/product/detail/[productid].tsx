import { NextPage } from 'next';
import ProductDetailComponent from '../../../components/product/detail';
import dlv from 'dlv';
import api from '../../../services/axios';

const ProductDetailPage: NextPage = (data) => {
	console.log('data efefef', data);

	return <ProductDetailComponent />;
};

ProductDetailPage.getInitialProps = async (ctx) => {
	console.log('ctx', ctx);
	console.log('ctx query.productId', ctx.query.productid);
	// if (!dlv(ctx, 'req')) return {};
	if (!dlv(ctx, 'query.productid')) return {};
	const props = await api.product.getDetailById(dlv(ctx, 'query.productid'));
	console.log('productDetail props', props);

	return props.data;
};

export default ProductDetailPage;
