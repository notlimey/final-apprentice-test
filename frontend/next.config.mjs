/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'media-cdn.tripadvisor.com',
				protocol: 'https',
			},
		],
	},
};

export default nextConfig;
