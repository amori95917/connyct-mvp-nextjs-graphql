import { classNames } from '@/utils/classnames';

export const ShareToMessageIcon = ({
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
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			enableBackground='new 0 0 48 48'
			viewBox='0 0 48 48'>
			<path
				fill={fillColor}
				fillRule='evenodd'
				d='M34,47H14c-2.762,0-5-2.238-5-5V24c0-2.761,2.238-5,5-5h4c0.553,0,1,0.448,1,1  s-0.447,1-1,1h-4c-1.656,0-3,1.344-3,3v18c0,1.657,1.344,3,3,3h20c1.657,0,3-1.343,3-3V24c0-1.656-1.343-3-3-3h-4  c-0.553,0-1-0.448-1-1s0.447-1,1-1h4c2.762,0,5,2.239,5,5v18C39,44.762,36.762,47,34,47z M31.334,10.715L25,4.381V30  c0,0.553-0.447,1-1,1s-1-0.447-1-1V4.381l-6.334,6.334c-0.381,0.381-0.999,0.381-1.381,0c-0.381-0.381-0.381-1,0-1.381l7.905-7.905  c0.032-0.047,0.053-0.101,0.095-0.144c0.195-0.194,0.451-0.287,0.705-0.283C23.994,1.002,23.996,1,24,1s0.007,0.002,0.01,0.002  c0.256-0.003,0.511,0.089,0.705,0.283c0.041,0.042,0.06,0.094,0.091,0.14l7.909,7.909c0.381,0.381,0.381,1,0,1.381  C32.333,11.096,31.715,11.096,31.334,10.715z'
				clipRule='evenodd'
			/>
		</svg>
	);
};