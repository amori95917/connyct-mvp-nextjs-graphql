import { useRouter } from 'next/router';
import { Navbar } from '@/shared-components/navbar';

import { CompanyLayout } from '@/shared-components/layouts';
import { CommunityHead } from '@/shared-components/community';
import { CommunityMembers } from '@/pages/company/communities/community-detail/members';
import { getSlug } from '@/utils/getSlug';

// import CommunityHome from '@/components/brand/community/community-home';

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
						<CommunityMembers communitySlug={communitySlug} />
					</div>
				</CompanyLayout>
			)}
		</>
	);
};
CommunityMembersPage.auth = true;

export default CommunityMembersPage;
