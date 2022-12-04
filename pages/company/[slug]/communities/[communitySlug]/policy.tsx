import { useRouter } from 'next/router';
import { Navbar } from '@/shared-components/navbar';

import { CompanyLayout } from '@/shared-components/layouts';
import { Policy } from '@/pages/company/communities/community-detail/policy';
import { CommunityHead } from '@/shared-components/community';

function getSlug(slug: string | string[] | undefined) {
	if (slug === undefined) return '';
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug)) return slug[0];
}

const CommunityPolicyPage = () => {
	const router = useRouter();
	const { slug, communitySlug: communitySlugVal } = router.query;
	let companySlug = getSlug(slug);
	let communitySlug = getSlug(communitySlugVal);

	return (
		<>
			<Navbar />
			{companySlug && (
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
					<Policy companySlug={companySlug} />
				</CompanyLayout>
			)}
		</>
	);
};
CommunityPolicyPage.auth = true;

export default CommunityPolicyPage;
