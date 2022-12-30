import { useRouter } from 'next/router';

import { CompanyFeeds } from '@/pages/company/feeds';
import { AuthorizationWrapper } from '@/shared-components/authorization-wrapper';
import { Header } from '@/shared-components/header';
import { CompanyLayout } from '@/shared-components/layouts';
import { Navbar } from '@/shared-components/navbar';
import { getSlug } from '@/utils/getSlug';

const CompanyFeedsPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);

	return (
		<>
			<AuthorizationWrapper allowedRoles={['USER', 'OWNER']}>
				{authorizedUser => {
					if (authorizedUser) {
						return (
							<>
								{authorizedUser?.activeRole?.name === 'USER' ? <Header /> : <Navbar />}
								{companySlug && (
									<CompanyLayout companySlug={companySlug}>
										<CompanyFeeds companySlug={companySlug} />
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

CompanyFeedsPage.auth = true;
export default CompanyFeedsPage;
