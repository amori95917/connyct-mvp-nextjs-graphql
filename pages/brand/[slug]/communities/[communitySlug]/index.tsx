import { useRouter } from 'next/router';

import CommunityDetail from '@/pages/company/communities/community-detail/CommunityDetail';
import { AuthorizationWrapper } from '@/shared-components/authorization-wrapper';
import { Header } from '@/shared-components/header';
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
											page='HOME'
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
CommunityPage.auth = true;

export default CommunityPage;
