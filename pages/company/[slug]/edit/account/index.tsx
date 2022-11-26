import { useRouter } from 'next/router';

import { Navbar } from '@/shared-components/navbar';
import { CompanyEditLayout } from '@/shared-components/layouts/company-edit-layout/CompanyEditLayout';
import { Account } from '@/pages/company/edit/account';

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
			<Navbar />
			<CompanyEditLayout companySlug={companySlug || ''} type='account'>
				<Account />
			</CompanyEditLayout>
		</>
	);
};

export default CompanySecurityPage;