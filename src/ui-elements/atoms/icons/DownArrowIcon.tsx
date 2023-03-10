export function DownArrowIcon({
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
			<svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 64 64'>
				<path d='M48.293 23.293L32 39.586 15.707 23.293l-1.414 1.561 17 17.146h1.414l17-17.146z' />
			</svg>
		</>
	);
}
