export function UpArrowIcon({
	className = '',
	height = '2em',
	width = '2em',
}: {
	className?: string;
	height?: string;
	width?: string;
}) {
	return (
		<>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				id='Layer_1'
				x='0'
				y='0'
				version='1.1'
				width={width}
				height={height}
				viewBox='0 0 29 29'
				xmlSpace='preserve'
			>
				<path
					fill='none'
					stroke='#000'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeMiterlimit='10'
					strokeWidth='1'
					d='M8.5 17.5l6-6 6 6'
				/>
			</svg>
		</>
	);
}
