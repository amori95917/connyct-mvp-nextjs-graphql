import { useRouter } from 'next/router';

import { Navbar } from '@/shared-components/navbar';
import { CompanyEditLayout } from '@/shared-components/layouts/company-edit-layout/CompanyEditLayout';
import { Branches } from '@/pages/company/edit/business-information/branches';
import { getSlug } from '@/utils/getSlug';

const CompanyBranchesPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);

	return (
		<>
			<Navbar />
			<CompanyEditLayout companySlug={companySlug || ''} type='business-information'>
				{data => {
					return <Branches data={data} />;
				}}
			</CompanyEditLayout>
		</>
	);
};

export default CompanyBranchesPage;
