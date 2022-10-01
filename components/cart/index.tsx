import dlv from 'dlv';
import Image from 'next/image';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getCarts, ICartSlice } from '../../stores/carts';
import { utils } from '../../utils';

const CartComponent: React.FC = () => {
	const carts = useSelector(getCarts);

	const products = dlv(carts, 'productList', []);
	return (
		<Fragment>
			<div className="flex flex-row gap-6 mt-[18px] min-w-[800px] min-h-[420px] bg-white rounded-lg p-6 overflow-auto">
				<div className="w-full h-full">
					<h1 className="text-[28px] leading-[36px] font-medium text-[#484848] mb-3">
						Cart
					</h1>

					<div className="grid grid-cols-9 w-full border-b border-b-[#DEDEDE] pb-1">
						<div className=" col-span-6">
							<h2 className="text-[18px] leading-[22px] font-medium">
								PRODUCT NAME
							</h2>
						</div>
						<div className="col-span-1 text-center">
							<h2 className="text-[18px] leading-[22px] font-medium">
								PRICE
							</h2>
						</div>
						<div className="col-span-1 text-center">
							<h2 className="text-[18px] leading-[22px] font-medium">
								QUANTITY
							</h2>
						</div>
						<div className="col-span-1 text-right">
							<h2 className="text-[18px] leading-[22px] font-medium">
								TOTAL
							</h2>
						</div>
					</div>

					{products.length ? (
						products.map((item: ICartSlice, index: number) => {
							const sumPriceByQuantity =
								dlv(item, 'product.data.attributes.price') *
								item.quantity;
							return (
								<div
									className="grid grid-cols-9 place-content-center w-full h-20 border-b border-b-[#DEDEDE] pb-1"
									key={`prod-${index}`}
								>
									<div className="col-span-6 w-full flex flex-row items-center space-x-2">
										<div className="relative flex shrink-0 w-[36px] h-[40px] rounded-[10px]">
											{dlv(
												item,
												'product.data.attributes.image_url'
											) ? (
												<Image
													src={dlv(
														item,
														'product.data.attributes.image_url'
													)}
													alt="product-img"
													layout="fill"
													priority
													className="object-cover rounded-2xl"
												/>
											) : (
												<div className="w-[36px] h-[40px] rounded-[10px] bg-green-200"></div>
											)}
										</div>
										<span className="text-sm font-medium text-[#484848] line-clamp-1">
											{dlv(
												item,
												'product.data.attributes.name'
											)}
										</span>
									</div>
									<div className="col-span-1 place-self-center">
										<span className="text-sm font-normal text-[#A0A0A0]">
											{utils.priceFormat(
												dlv(
													item,
													'product.data.attributes.price'
												)
											)}
										</span>
									</div>
									<div className="col-span-1 place-self-center">
										<span className="text-sm font-normal text-[#484848]">
											{dlv(item, 'quantity')}
										</span>
									</div>
									<div className="col-span-1 self-center text-right">
										<span className="text-sm font-normal text-[#A0A0A0]">
											{utils.priceFormat(
												sumPriceByQuantity.toFixed(2)
											)}
										</span>
									</div>
								</div>
							);
						})
					) : (
						<div className="flex items-center justify-center w-full h-[160px] text-[#484848]">
							ถึงเค้าจะไม่ว่าง แต่เราว่างอยู่นะ!
						</div>
					)}
					<div className="flex flex-col items-end justify-center w-full h-[100px] mt-6">
						<div className="flex flex-row space-x-3 items-center mb-4">
							<span className="text-xl font-medium text-[#484848]">{`Subtotal (${carts.totalProducts} Product):`}</span>
							<span className="text-[28px] leading-[36px] font-medium text-[#FF6F61]">
								{utils.priceFormat(carts.totalPrice.toFixed(2))}
							</span>
						</div>
						<button className="flex items-center justify-center text-white bg-[#FF6F61] w-[290px] h-[50px] rounded-lg">
							<span>Proceed to checkout</span>
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
export default CartComponent;
