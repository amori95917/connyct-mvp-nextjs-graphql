import { classNames } from '@/utils/classnames';

export const ShareIcon = ({
	className = '',
	width = '2em',
	height = '2em',
	fillColor = 'var(--color-primary)',
	strokeColor = 'var(--color-primary)',
	...props
}: {
	className?: string;
	width?: string;
	height?: string;
	fillColor?: string;
	strokeColor?: string;
}) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
			<g fill={fillColor} fillRule='evenodd' stroke={strokeColor}>
				<circle cx='17.246' cy='4.816' r='3.275' />
				<circle cx='17.246' cy='19.451' r='3.275' />
				<circle cx='4.887' cy='12.133' r='3.275' />
				<path d='M14.04 6.106L7.489 9.608l6.55-3.502zM14.04 17.882l-6.551-3.503 6.55 3.503z' />
			</g>
		</svg>
	);
};
