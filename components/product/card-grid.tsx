import dlv from 'dlv';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IProduct } from '../../pages/product';
import { utils } from '../../utils';
import { StartBoldIcon, StartOutlineIcon } from './icon';
import RatingComponent from './rating-start';

const ProductCardGrid: React.FC<{ product: IProduct }> = ({ product }) => {
	const router = useRouter();

	return (
		<div
			className="flex flex-col gap-4 w-[250px] h-[366px] rounded-lg bg-white hover:shadow-md transform hover:-translate-y-1 duration-300 cursor-pointer"
			onClick={() => router.push(`/product/detail/${product.id}`)}
		>
			<div className="relative w-[250px] h-[250px] rounded-lg">
				{dlv(product, 'attributes.image_url') ? (
					<Image
						src={dlv(product, 'attributes.image_url')}
						alt="product-img"
						layout="fill"
						priority
						className="object-cover rounded-lg"
					/>
				) : (
					<div className="w-[250px] h-[250px] rounded-lg bg-green-200"></div>
				)}
			</div>

			<div className="flex flex-row space-x-2 p-2 rounded-b-lg bg-white">
				<div>
					{dlv(
						product,
						'attributes.brand.data.attributes.logo_url'
					) ? (
						<div className="relative w-10 h-10">
							<Image
								src={dlv(
									product,
									'attributes.brand.data.attributes.logo_url'
								)}
								alt="brand-logo"
								className="object-cover rounded-[10px]"
								layout="fill"
							/>
						</div>
					) : (
						<div className="w-10 h-10 rounded-[10px] bg-green-200"></div>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<div className="h-10">
						<h2 className="text-sm text-[#484848] font-semibold line-clamp-2">
							{dlv(product, 'attributes.name')}
						</h2>
					</div>
					<div className="flex flex-row space-x-2 text-xs text-[#939393] h-9">
						<div>
							<h3 className="mb-1">Price</h3>
							<h2 className="text-sm font-medium text-[#FF6F61]">
								{utils.priceFormat(
									dlv(product, 'attributes.price', 0).toFixed(
										2
									)
								)}
							</h2>
						</div>
						<div>
							<h3 className="mb-2">{`Reviews (${dlv(
								product,
								'attributes.review.number',
								'0'
							)} reviews)`}</h3>
							<RatingComponent
								rating={dlv(
									product,
									'attributes.review.rating',
									0
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProductCardGrid;
