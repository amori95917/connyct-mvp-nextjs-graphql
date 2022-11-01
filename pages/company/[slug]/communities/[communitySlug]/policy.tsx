import { useRouter } from 'next/router';
import { Navbar } from '@/shared-components/navbar';

import { CompanyLayout } from '@/shared-components/layouts';
// import CommunityHome from '@/components/brand/community/community-home';

function getSlug(slug: string | string[] | undefined) {
	if (slug === undefined) return '';
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug)) return slug[0];
}

const CommunityPolicyPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);
	return (
		<>
			<Navbar />
			<CompanyLayout companySlug={companySlug || ''}>Community Home</CompanyLayout>
		</>
	);
};
CommunityPolicyPage.auth = true;

export default CommunityPolicyPage;
