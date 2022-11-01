import { useRouter } from 'next/router';

import { Navbar } from '@/shared-components/navbar';
import { CompanyLayout } from '@/shared-components/layouts';
import { Feeds as CompanyFeeds } from '@/pages/company/feeds';

function getSlug(slug: string | string[] | undefined) {
	if (slug === undefined) return '';
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug)) return slug[0];
}

const CompanyFeedsPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);

	return (
		<>
			<Navbar />
			<CompanyLayout companySlug={companySlug || ''}>
				<CompanyFeeds companySlug={companySlug || ''} />
			</CompanyLayout>
		</>
	);
};

export default CompanyFeedsPage;
