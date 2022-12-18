export function PlusIcon({ className = 'w-6 h-6', ...props }: { className: string }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={className}
			fill='var(--color-primary)'
			viewBox='0 0 24 24'
			stroke='var(--color-primary)'
			{...props}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M12 6v6m0 0v6m0-6h6m-6 0H6'
			/>
		</svg>
	);
}
