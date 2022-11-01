module.exports = {
	mode: 'jit',
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				pinkish: 'rgb(224, 36, 94)',
				// primary: '#165A71',
				'icon-color': '#00E0FF',
				primary: '#2599c0',
				'primary-hover': 'rgb(26, 145, 218)',
				dark: 'rgb(21, 32, 43)',
				'dark-lighter': 'rgb(25, 39, 52)',
				'dark-hover': 'rgb(22, 45, 64)',
				'light-bg': '#f8fafc',
				'lavender-dark': '#30CCFE',
			},
			opacity: {
				0: 0,
				15: '0.15',
				25: '0.25',
				50: '0.50',
				75: '0.75',
				100: '100',
			},
			// border: {
			// 	// primary: '#165A71',
			// 	// primary: '#2599c0',
			// },
			borderRadius: {
				none: '0',
				sm: '0.125rem',
				default: '0.25rem',
				md: '0.375rem',
				lg: '0.5rem',
				full: '9999px',
				xl: '1rem',
			},
			height: {
				128: '26rem',
				129: '38rem',
				130: '40rem',
				127: '29rem',
			},
			width: {
				76: '19rem',
				128: '26rem',
				129: '38rem',
				130: '40rem',
				132: '45rem',
				134: '50rem',
			},
			spacing: {
				24: '5.5rem',
			},
			minWidth: {
				'1/3': '20%',
			},
			zIndex: {
				9: '9',
			},
		},
	},
	variants: {},
	plugins: ['tailwindcss', 'postcss-preset-env'],
};
