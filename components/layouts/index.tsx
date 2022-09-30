import { Fragment } from 'react';
import Footer from './footer';
import Header from './header';

interface ILayoutProps {
	children: any;
}
const Layout = (props: ILayoutProps) => {
	return (
		<Fragment>
			<Header />
			<main className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg min-h-screen mx-auto mt-[76px] mb-[54px] pt-8">
				{props.children}
			</main>
			<Footer />
		</Fragment>
	);
};
export default Layout;
