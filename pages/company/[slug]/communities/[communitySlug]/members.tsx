import { useRouter } from 'next/router';
import { Navbar } from '@/shared-components/navbar';

import { CompanyLayout } from '@/shared-components/layouts';
import { CommunityHead, CommunityMembers } from '@/shared-components/community';

// import CommunityHome from '@/components/brand/community/community-home';

function getSlug(slug: string | string[] | undefined) {
	if (slug === undefined) return '';
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug)) return slug[0];
}

const CommunityMembersPage = () => {
	const router = useRouter();
	const { slug, communitySlug: communitySlugValue } = router.query;
	let companySlug = getSlug(slug);
	let communitySlug = getSlug(communitySlugValue);
	return (
		<>
			<Navbar />
			{companySlug && communitySlug && (
				<CompanyLayout companySlug={companySlug}>
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
						<CommunityMembers />
					</div>
				</CompanyLayout>
			)}
		</>
	);
};
CommunityMembersPage.auth = true;

export default CommunityMembersPage;
