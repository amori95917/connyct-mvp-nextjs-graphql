import { classNames } from '@/utils/classnames';

export const CustomerIcon = ({ className = '', ...props }: { className?: string }) => {
	const _class = 'h-5 text-primary w-5';

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={classNames(_class, className)}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			{...props}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
			/>
		</svg>
	);
};
