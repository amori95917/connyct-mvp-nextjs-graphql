import { Navbar } from '@/shared-components/navbar';
import { useRouter } from 'next/router';

import { AuthorizationWrapper } from '@/shared-components/authorization-wrapper';
import { Header } from '@/shared-components/header';
import { CompanyLayout } from '@/shared-components/layouts';
// import CommunityHome from '@/components/brand/community/community-home';

function getSlug(slug: string | string[] | undefined) {
	if (slug === undefined) return '';
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug)) return slug[0];
}

const CommunityAboutPage = () => {
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
									<CompanyLayout companySlug={companySlug || ''}>Community Home</CompanyLayout>
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
CommunityAboutPage.auth = true;

export default CommunityAboutPage;
