const purgecss = [
	'@fullhuman/postcss-purgecss',
	{
		content: ['./src/**/*.{js,ts,tsx}', './pages/**/*.{js,ts,tsx}'],
		defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
	},
];
module.exports = {
	plugins: [
		'postcss-import',
		'tailwindcss/nesting',
		'tailwindcss',
		'autoprefixer',
		...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
	],
};
