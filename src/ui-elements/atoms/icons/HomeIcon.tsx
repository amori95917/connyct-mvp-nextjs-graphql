const HomeIcon = () => {
	return (
		<svg
			className='h-6 mr-2 w-6'
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' strokeWidth={3.68} stroke='#5A6399' />
			<path
				d='M9 20.2V12h6v8.2'
				strokeWidth={3}
				style={{ stroke: 'url(#gradient)', mixBlendMode: 'multiply' }}
			/>
			<linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
				<stop offset='0%' stopColor='#5A6399' />
				<stop offset='100%' stopColor='#EA9A7E' />
			</linearGradient>
		</svg>
	);
};

export default HomeIcon;
