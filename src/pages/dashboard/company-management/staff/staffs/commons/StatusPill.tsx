import { classNames } from '@/utils/classnames';

export function StatusPill({ value }) {
	const status = value ? value.toLowerCase() : 'unknown';

	return (
		<span
			className={classNames(
				'font-bold leading-wide px-3 py-1 rounded-full shadow-sm text-xs uppercase',
				status.startsWith('CEO') ? 'bg-green-100 text-green-800' : null,
			)}
		>
			{status}
		</span>
	);
}
