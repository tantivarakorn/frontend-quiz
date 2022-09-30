import dlv from 'dlv';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IProduct } from '../../pages/product';
import { utils } from '../../utils';
import { StartBoldIcon, StartOutlineIcon } from './icon';

const ProductCardList: React.FC<{ product: IProduct }> = ({ product }) => {
	const router = useRouter();
	return (
		<div
			className="flex flex-row gap-6 p-6 w-full h-[110px] rounded-lg bg-white hover:shadow-md transform duration-300 cursor-pointer"
			onClick={() => router.push(`/product/detail/${product.id}`)}
		>
			<div className="flex shrink-0 relative w-[60px] h-[60px] rounded-lg">
				{dlv(product, 'attributes.image_url') ? (
					<Image
						src={dlv(product, 'attributes.image_url')}
						alt="product-img"
						layout="fill"
						className="object-cover rounded-lg"
					/>
				) : (
					<div className="w-[60px] h-[60px] rounded-lg bg-green-200"></div>
				)}
			</div>
			<div className="flex flex-col justify-between h-[60px]">
				<h2 className="text-xl text-[#484848] font-semibold line-clamp-1">
					{dlv(product, 'attributes.name')}
				</h2>
				<h3 className="text-xs text-[#A4A4A4] font-normal line-clamp-2">
					{dlv(product, 'attributes.description')}
				</h3>
			</div>
			<div className="flex flex-col shrink-0 items-end justify-between w-[113px] h-[60px]">
				<div>
					<h2 className="text-xl font-medium text-[#FF6F61]">
						{utils.priceFormat(
							dlv(product, 'attributes.price', 0).toFixed(2)
						)}
					</h2>
				</div>
				<div className="flex flex-row">
					{[1, 2, 3, 4, 5].map((i) => {
						let ShowIcon;
						if (i <= dlv(product, 'attributes.review.rating', 0)) {
							ShowIcon = StartBoldIcon;
						} else {
							ShowIcon = StartOutlineIcon;
						}
						return <ShowIcon key={`i-${i}`} />;
					})}
				</div>
				<div>
					<h3 className="text-xs text-[#939393] font-normal">{`Reviews (${dlv(
						product,
						'attributes.review.number',
						'0'
					)} reviews)`}</h3>
				</div>
			</div>
		</div>
	);
};
export default ProductCardList;
