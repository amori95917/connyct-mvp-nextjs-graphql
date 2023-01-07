import classnames from 'classnames';
import { SVGProps } from 'react';

type IconProps = {
	className?: string;
} & SVGProps<SVGSVGElement>;

const BackIcon = (props: IconProps) => {
	const { className, ...rest } = props;
	return (
		<>
			<svg
				className={classnames('h-5 mr-2 w-5', className)}
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				{...rest}>
				<defs>
					<linearGradient id='radial-gradient' x1='50%' x2='50%' y1='0%' y2='100%'>
						<stop offset='0%' stopColor='#ea9a7e' />
						<stop offset='60%' stopColor='#5A6399' />
						<stop offset='100%' stopColor='#5A6399' />
					</linearGradient>
				</defs>
				<path
					d='M19 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H19V11Z'
					fill='url(#radial-gradient)'
				/>
			</svg>
		</>
	);
};

export default BackIcon;
