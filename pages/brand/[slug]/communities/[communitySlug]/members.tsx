import { Navbar } from '@/shared-components/navbar';
import { useRouter } from 'next/router';

import CommunityDetail from '@/pages/company/communities/community-detail/CommunityDetail';
import { AuthorizationWrapper } from '@/shared-components/authorization-wrapper';
import { Header } from '@/shared-components/header';
import { CompanyLayout } from '@/shared-components/layouts';
import { getSlug } from '@/utils/getSlug';

const CommunityMembersPage = () => {
	const router = useRouter();
	const { slug, communitySlug: communitySlugValue } = router.query;
	let companySlug = getSlug(slug);
	let communitySlug = getSlug(communitySlugValue);
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
											page='MEMBERS'
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

export default CommunityMembersPage;
