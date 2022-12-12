import { useRouter } from 'next/router';
import { Navbar } from '@/shared-components/navbar';

import { Policies } from '@/pages/company/communities/community-detail/policy';
import { CompanyLayout } from '@/shared-components/layouts';
import { CommunityHead } from '@/shared-components/community';
import { getSlug } from '@/utils/getSlug';

const CommunityPolicyPage = () => {
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
					<Policies communitySlug={communitySlug} />
				</CompanyLayout>
			)}
		</>
	);
};
CommunityPolicyPage.auth = true;

export default CommunityPolicyPage;
