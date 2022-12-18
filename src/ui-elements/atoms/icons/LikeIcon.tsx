import { classNames } from '@/utils/classnames';

export const LikeIcon = ({
	className = '',
	height = '2em',
	width = '2em',
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
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 101 101' width={width} height={height}>
			<path
				fill={fillColor}
				d='M49.7 80.9c.3.1.6.2.9.2.3 0 .6-.1.9-.2C78 70.1 86.9 50.7 84.1 36.2c-1.9-9.8-8.9-16.1-17.8-16.1-5 0-10.4 2-15.7 5.9-5.3-4-10.8-6.1-15.8-6.1-8.9 0-15.9 6.4-17.8 16.2-2.9 14.7 6.1 34.2 32.7 44.8zM21.6 37.1c1.4-7.5 6.6-12.3 13.1-12.3 4.4 0 9.4 2.1 14.3 6.2.9.7 2.1.7 3 0 4.9-4 9.8-6 14.2-6 6.5 0 11.7 4.8 13.1 12.2 2.4 12.4-5.6 29.2-28.8 39-23.2-9.8-31.3-26.6-28.9-39.1z'
			/>
		</svg>
	);
};
