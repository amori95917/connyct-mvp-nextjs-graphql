/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['i.pravatar.cc', 'res.cloudinary.com'],
	},
	experimental: {
		fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};

module.exports = withBundleAnalyzer(nextConfig);
