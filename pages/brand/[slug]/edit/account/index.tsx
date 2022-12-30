import { useRouter } from 'next/router';

import { Account } from '@/pages/company/edit/account';
import { AuthorizationWrapper } from '@/shared-components/authorization-wrapper';
import { CompanyEditLayout } from '@/shared-components/layouts/company-edit-layout/CompanyEditLayout';
import { Navbar } from '@/shared-components/navbar';

function getSlug(slug: string | string[] | undefined) {
	if (slug === undefined) return '';
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug)) return slug[0];
}

const CompanySecurityPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);

	return (
		<>
			<AuthorizationWrapper allowedRoles={['OWNER']}>
				<Navbar />
				<CompanyEditLayout companySlug={companySlug || ''} type='account'>
					<Account />
				</CompanyEditLayout>
			</AuthorizationWrapper>
		</>
	);
};

CompanySecurityPage.auth = true;
export default CompanySecurityPage;
