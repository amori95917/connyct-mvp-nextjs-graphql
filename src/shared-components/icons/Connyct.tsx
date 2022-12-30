export function ConnyctLogo({
	className = '',
	height = '2em',
	width = '2em',
}: {
	className?: string;
	height: string;
	width: string;
}) {
	return (
		<>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				id='SvgjsSvg1038'
				width={width}
				height={height}
				version='1.1'
			>
				<defs id='SvgjsDefs1039' />
				<g id='SvgjsG1040'>
					<svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 20 8'>
						<path
							fill='#00e0ff'
							fillRule='evenodd'
							d='M100 3171c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2m-6 0c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2m-6 0c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2m12-6a3.972 3.972 0 0 0-3 1.38 3.972 3.972 0 0 0-3-1.38 3.972 3.972 0 0 0-3 1.38 3.972 3.972 0 0 0-3-1.38 4 4 0 0 0 0 8 3.972 3.972 0 0 0 3-1.38 3.972 3.972 0 0 0 3 1.38 3.972 3.972 0 0 0 3-1.38 3.972 3.972 0 0 0 3 1.38 4 4 0 0 0 0-8'
							transform='translate(-84 -3165)'
							className={className}
						/>
					</svg>
				</g>
			</svg>
		</>
	);
}

ConnyctLogo.displayName = 'ConnyctLogo';
