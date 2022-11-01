import { useRouter } from 'next/router';
import { Navbar } from '@/shared-components/navbar';

import { CompanyLayout } from '@/shared-components/layouts';
import { CommunityHead, CommunityHome } from '@/shared-components/community';

function getSlug(slug: string | string[] | undefined) {
	if (slug === undefined) return '';
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug)) return slug[0];
}

const CommunityPage = () => {
	const router = useRouter();
	const { slug, communitySlug } = router.query;
	let companySlug = getSlug(slug);
	console.log('router --', router);
	return (
		<>
			<Navbar />
			<CompanyLayout companySlug={companySlug || ''}>
				<CommunityHead
					coverImage='/images/community/background.jpg'
					profileImage='/images/community/background.jpg'
					communityName='My Community'
					groupStatus='Public Group'
					members='0k'
					companySlug={companySlug}
					communitySlug={communitySlug}
				/>
				<div className='mt-6'>
					<CommunityHome />
				</div>
			</CompanyLayout>
		</>
	);
};
CommunityPage.auth = true;

export default CommunityPage;
