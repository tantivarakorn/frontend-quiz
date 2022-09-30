import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import dlv from 'dlv';
import api from '../../../services/axios';
import Image from 'next/image';
import { StartBoldIcon, StartOutlineIcon } from '../icon';
import { BagTick } from 'iconsax-react';
import { utils } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCarts, ICartSlice } from '../../../stores/carts';

export interface IProductDetail {
	data?: {
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
		};
	};
	meta?: any;
}

const ProductDetailComponent: React.FC = () => {
	const router = useRouter();
	const productId = dlv(router, 'query.productid');
	const [product, setProduct] = useState<IProductDetail>({});
	const carts = useSelector(getCarts);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!productId) return;
		const getProducts = async () => {
			try {
				const { data } = await api.product.getDetailById(productId);
				setProduct(data);
			} catch (error) {
				console.error(error);
			}
		};
		getProducts();
	}, [productId]);

	const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

	const increment = () => {
		if (selectedQuantity >= 9) return;
		setSelectedQuantity(selectedQuantity + 1);
	};
	const decrement = () => {
		if (selectedQuantity <= 1) return;
		setSelectedQuantity(selectedQuantity - 1);
	};

	const addProductToCart = () => {
		const payload: ICartSlice = {
			product: product,
			quantity: selectedQuantity,
		};
		dispatch(addToCart(payload));
	};

	return (
		<Fragment>
			{dlv(product, 'data.id') ? (
				<div className="flex flex-row gap-6 mt-[18px] w-full h-[448px] bg-white rounded-2xl p-6">
					<div className="relative flex shrink-0 w-[400px] h-[400px] rounded-2xl">
						{dlv(product, 'data.attributes.image_url') ? (
							<Image
								src={dlv(product, 'data.attributes.image_url')}
								alt="product-img"
								layout="fill"
								priority
								className="object-cover rounded-2xl"
							/>
						) : (
							<div className="w-[400px] h-[400px] rounded-2xl bg-green-200"></div>
						)}
					</div>
					<div className="flex flex-col w-full">
						<h1 className="text-[28px] leading-[36px] font-medium text-[#707070] line-clamp-2 mb-3">
							{dlv(product, 'data.attributes.name', '')}
						</h1>
						<div className="flex flex-row items-center space-x-4 mb-3">
							<div className="flex flex-row items-center">
								{[1, 2, 3, 4, 5].map((i) => {
									let ShowIcon;
									if (
										i <=
										dlv(
											product,
											'data.attributes.review.rating',
											0
										)
									) {
										ShowIcon = StartBoldIcon;
									} else {
										ShowIcon = StartOutlineIcon;
									}
									return <ShowIcon key={`i-${i}`} />;
								})}
							</div>
							<span className="text-sm text-[#A4A4A4]">{`(${dlv(
								product,
								'data.attributes.review.number',
								'0'
							)} reviews)`}</span>
						</div>
						<p className="text-sm text-[#939393] font-normal mb-4 line-clamp-3">
							{dlv(product, 'data.attributes.description', '')}
						</p>
						<div className="mb-4">
							<h2 className="text-sm text-[#939393] font-medium">
								Price
							</h2>
							<div className="flex flex-row items-center space-x-8">
								<span className="text-[28px] leading-[36px] font-medium text-[#FF6F61]">
									{utils.priceFormat(
										dlv(
											product,
											'data.attributes.price',
											0
										).toFixed(2)
									)}
								</span>
								{/* ไม่มีข้อมูลราคาเต็ม */}
								<span className="text-sm text-[#939393] font-normal line-through">
									{utils.priceFormat((12000).toFixed(2))}
								</span>
							</div>
						</div>
						<div className="flex flex-row items-center justify-between w-[254px] h-[38px]">
							<span>Quantity:</span>
							<div className="flex flex-row w-[130px] items-center justify-center border border-[#484848] rounded-[10px]">
								<div
									className={`flex items-center justify-center w-10 h-[38px] bg-white rounded-l-[10px] select-none
							${selectedQuantity <= 1 ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer'}
							`}
									onClick={decrement}
								>
									<span className="text-[18px]">-</span>
								</div>
								<div className="flex items-center justify-center w-[50px] h-[38px] bg-[#F5F5F5]">
									<span>{selectedQuantity}</span>
								</div>

								<div
									className={`flex items-center justify-center w-10 h-[38px] bg-white rounded-r-[10px] select-none
							${
								selectedQuantity >= 9
									? 'cursor-not-allowed text-gray-300'
									: 'cursor-pointer'
							}`}
									onClick={increment}
								>
									<span className="text-[18px]">+</span>
								</div>
							</div>
						</div>

						<button
							className="flex items-center justify-center space-x-2 text-white bg-[#FF6F61] w-[242px] h-[50px] rounded-lg mt-10"
							onClick={addProductToCart}
						>
							<BagTick size="18" color="#FFFFFF" />
							<span>Add to cart</span>
						</button>
					</div>
				</div>
			) : (
				<div className="loading"></div>
			)}
		</Fragment>
	);
};

export default ProductDetailComponent;
