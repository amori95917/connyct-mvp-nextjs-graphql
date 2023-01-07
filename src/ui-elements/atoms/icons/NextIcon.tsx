import classnames from 'classnames';
import { SVGProps } from 'react';

type IconProps = {
	className?: string;
} & SVGProps<SVGSVGElement>;

const NextIcon = (props: IconProps) => {
	const { className, ...rest } = props;
	return (
		<>
			<svg
				className={classnames('h-4 mr-2 w-4', className)}
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
				{...rest}>
				<defs>
					<linearGradient id='gradient' x1='50%' x2='50%' y1='0%' y2='100%'>
						<stop offset='0%' stopColor='#5A6399' />
						<stop offset='100%' stopColor='#ea9a7e' />
					</linearGradient>
				</defs>
				<path
					stroke='url(#gradient)'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2.5}
					d='M6 18L18 12 6 6'
				/>
			</svg>
		</>
	);
};

export default NextIcon;
