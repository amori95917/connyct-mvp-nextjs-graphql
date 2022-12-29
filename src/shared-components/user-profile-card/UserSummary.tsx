import { useUserConnectionsSummary } from '@/hooks/services/useUserConnectionsSummary';

const summaryType = 'text-slate-400 text-sm';
const boldSecondaryTextClassNames = 'font-bold text-xl';
const spanContainerClassNames = 'flex flex-col items-center';

const UserSummary = () => {
	const { response } = useUserConnectionsSummary();
	if (response?.summary) {
		const { summary } = response;
		return (
			<>
				<span className={spanContainerClassNames}>
					<span className={boldSecondaryTextClassNames}>{summary.connectedBrands || 0}</span>
					<span className={summaryType}>Connected Brands</span>
				</span>
				<span className={spanContainerClassNames}>
					<span className={boldSecondaryTextClassNames}>{summary.connectedEvangelists || 0}</span>
					<span className={summaryType}>Connected Evangelists</span>
				</span>
				<span className={spanContainerClassNames}>
					<span className={boldSecondaryTextClassNames}>0</span>
					<span className={summaryType}>Evangelers</span>
				</span>
			</>
		);
	}
};

export default UserSummary;
