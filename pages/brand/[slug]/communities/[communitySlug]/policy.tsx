import { Navbar } from '@/shared-components/navbar';
import { useRouter } from 'next/router';

import CommunityDetail from '@/pages/company/communities/community-detail/CommunityDetail';
import { AuthorizationWrapper } from '@/shared-components/authorization-wrapper';
import { Header } from '@/shared-components/header';
import { CompanyLayout } from '@/shared-components/layouts';
import { getSlug } from '@/utils/getSlug';

const CommunityPolicyPage = () => {
	const router = useRouter();
	const { slug, communitySlug: communitySlugVal } = router.query;
	let companySlug = getSlug(slug);
	let communitySlug = getSlug(communitySlugVal);

	return (
		<>
			<AuthorizationWrapper allowedRoles={['USER', 'OWNER']}>
				{authorizedUser => {
					if (authorizedUser) {
						return (
							<>
								{authorizedUser?.activeRole?.name === 'USER' ? <Header /> : <Navbar />}
								{companySlug && communitySlug && (
									<CompanyLayout companySlug={companySlug}>
										<CommunityDetail
											companySlug={companySlug}
											communitySlug={communitySlug}
											authorizedUser={authorizedUser}
											page='POLICY'
										/>
									</CompanyLayout>
								)}
							</>
						);
					}
					return <p>You do not have access to this page.</p>;
				}}
			</AuthorizationWrapper>
		</>
	);
};
CommunityPolicyPage.auth = true;

export default CommunityPolicyPage;
