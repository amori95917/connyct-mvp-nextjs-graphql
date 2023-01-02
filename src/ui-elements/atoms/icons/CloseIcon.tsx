const CloseIcon = props => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<path
				d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z'
				fill='#FF5A5F'
			/>
			<path
				d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z'
				fill='url(#paint0_linear)'
			/>
			<defs>
				<linearGradient
					id='paint0_linear'
					x1='12'
					y1='24'
					x2='12'
					y2='0'
					gradientUnits='userSpaceOnUse'>
					<stop offset='0%' stopColor='#5A6399' />
					<stop offset='60%' stopColor='#5A6399' />
					<stop offset='100%' stopColor='#EA9A7E' />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default CloseIcon;
