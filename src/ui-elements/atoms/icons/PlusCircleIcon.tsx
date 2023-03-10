import { classNames } from '@/utils/classnames';

export function PlusCircleIcon({ className, ...props }: { className: string }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={classNames('h-6 w-6', className)}
			fill='none'
			viewBox='0 0 24 24'
			stroke='var(--color-primary)'
			{...props}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
			/>
		</svg>
	);
}
