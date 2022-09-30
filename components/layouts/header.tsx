import Image from 'next/image';
import Link from 'next/link';
import { BagHappy } from 'iconsax-react';

const Header = () => {
	const navigation = [
		{ name: 'Home', id: 1, url: '/product' },
		{ name: 'New Products', id: 2, url: '/' },
		{ name: 'Women', id: 3, url: '/' },
		{ name: 'Men', id: 4, url: '/' },
		{ name: 'Kid', id: 5, url: '/' },
		{ name: 'Accessories', id: 6, url: '/' },
	];

	return (
		<nav className="fixed top-0 inset-x-0 bg-[#FF6F61] z-10">
			<div className="flex items-center justify-between lg:max-w-screen-lg h-[76px] mx-auto">
				<div>
					<Link href="/product">
						<a>
							<Image
								src="https://sagnerli.sirv.com/cc-quiz/cob-logo.png"
								width={77}
								height={36}
								alt="logo"
							/>
						</a>
					</Link>
				</div>
				<div className="flex flex-row space-x-[58px]">
					{navigation.map((nav) => {
						return (
							<Link key={`nav-${nav.id}`} href={nav.url}>
								<a className="text-white">{nav.name}</a>
							</Link>
						);
					})}
				</div>
				<div className="flex flex-row items-center space-x-2">
					<div className="relative">
						<BagHappy size="32" color="#FFFFFF" />
						<div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1A586A] text-[10px] text-center text-white">
							0
						</div>
					</div>
					<span className="text-white text-xs">Cart</span>
				</div>
			</div>
		</nav>
	);
};
export default Header;
