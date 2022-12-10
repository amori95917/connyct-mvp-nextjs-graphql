import { useRouter } from 'next/router';

import { CommunityHome } from '@/pages/company/communities/community-detail/community-home';
import { CommunityHead } from '@/shared-components/community';
import { CompanyLayout } from '@/shared-components/layouts';
import { Navbar } from '@/shared-components/navbar';
import { getSlug } from '@/utils/getSlug';

const CommunityPage = () => {
	const router = useRouter();
	const { slug, communitySlug: communitySlugVal } = router.query;
	let companySlug = getSlug(slug);
	let communitySlug = getSlug(communitySlugVal);

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
						<CommunityHome communitySlug={communitySlug} />
					</div>
				</CompanyLayout>
			)}
		</>
	);
};
CommunityPage.auth = true;

export default CommunityPage;
