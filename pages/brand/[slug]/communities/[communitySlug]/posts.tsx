import { useRouter } from 'next/router';
import { Navbar } from '@/shared-components/navbar';

import { CompanyLayout } from '@/shared-components/layouts';
import { getSlug } from '@/utils/getSlug';
// import CommunityHome from '@/components/brand/community/community-home';

const CommunityPostsPage = () => {
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
CommunityPostsPage.auth = true;

export default CommunityPostsPage;
