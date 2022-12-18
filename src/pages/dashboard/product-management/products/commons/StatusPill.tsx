import { classNames } from '@/utils/classnames';

export function StatusPill({ value }) {
	const status = value ? value.toLowerCase() : 'unknown';

	return (
		<span
			className={classNames(
				'font-bold leading-wide px-3 py-1 rounded-full shadow-sm text-xs uppercase',
				status.startsWith('active') ? 'bg-green-100 text-green-800' : null,
				status.startsWith('inactive') ? 'bg-yellow-100 text-yellow-800' : null,
				status.startsWith('offline') ? 'bg-red-100 text-red-800' : null
			)}
		>
			{status}
		</span>
	);
}
