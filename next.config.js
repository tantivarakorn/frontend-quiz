/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['sagnerli.sirv.com', 'fs.chomchob.com'],
	},
	async rewrites() {
		return [
			{
				source: '/cc-quiz-api/:path*',
				destination: `https://cc-quiz-api.herokuapp.com/api/:path*`,
			},
		];
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/product',
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;
