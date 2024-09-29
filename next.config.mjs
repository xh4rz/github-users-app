/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// remotePatterns: ['https://api.github.com/']

		remotePatterns: [
			{
				protocol: 'http',
				hostname: '**'
			},
			{
				protocol: 'https',
				hostname: '**'
			}
		]
	}
};

export default nextConfig;
