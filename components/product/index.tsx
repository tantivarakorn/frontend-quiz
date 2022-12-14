import { Fragment, useEffect, useState } from 'react';
import { IProduct, IProductData } from '../../pages/product';
import { Category, RowVertical, Star1 } from 'iconsax-react';
import dlv from 'dlv';
import ProductCardGrid from './card-grid';
import ProductCardList from './card-list';
import api from '../../services/axios';

const ProductComponent = () => {
	const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
	const [products, setProducts] = useState<IProductData>({});

	useEffect(() => {
		const getProducts = async () => {
			try {
				const { data } = await api.product.get();
				setProducts(data);
			} catch (error) {
				console.log(error);
			}
		};
		getProducts();
	}, []);

	return (
		<Fragment>
			<div className="flex flex-row items-center justify-between h-[40px] px-6 md:px-0">
				<h1 className="text-base text-[#484848] font-semibold">{`Products (${dlv(
					products,
					'meta.pagination.total',
					'0'
				)})`}</h1>
				<div className="flex flex-row items-center justify-between w-20 h-[40px] border border-white rounded-lg cursor-pointer">
					<div
						className={`w-10 p-2 rounded-l-lg ${
							selectedView === 'grid'
								? 'bg-white'
								: 'bg-transparent'
						}`}
						onClick={() => setSelectedView('grid')}
					>
						<Category size="24" color="#292D32" />
					</div>
					<div
						className={`w-10 p-2 rounded-r-lg ${
							selectedView === 'list'
								? 'bg-white'
								: 'bg-transparent'
						}`}
						onClick={() => setSelectedView('list')}
					>
						<RowVertical size="24" color="#292D32" />
					</div>
				</div>
			</div>
			{dlv(products, 'data') ? (
				<div
					className={`mt-3 px-6 md:px-0 ${
						selectedView === 'grid'
							? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[22px] place-items-center'
							: 'flex flex-col gap-3'
					}`}
				>
					{dlv(products, 'data', []).map(
						(product: IProduct, index: number) => {
							return (
								<Fragment key={`pg-${index}`}>
									{selectedView === 'grid' && (
										<ProductCardGrid product={product} />
									)}
									{selectedView === 'list' && (
										<ProductCardList product={product} />
									)}
								</Fragment>
							);
						}
					)}
				</div>
			) : (
				<div className="loading"></div>
			)}
		</Fragment>
	);
};

export default ProductComponent;
