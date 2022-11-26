import { useRouter } from 'next/router';

import { Navbar } from '@/shared-components/navbar';
import { CompanyEditLayout } from '@/shared-components/layouts/company-edit-layout/CompanyEditLayout';
import { Documents } from '@/pages/company/edit/business-information/documents';
import { getSlug } from '@/utils/getSlug';

const BusinessDocumentEditPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);

	return (
		<>
			<Navbar />
			<CompanyEditLayout companySlug={companySlug || ''} type='business-information'>
				{data => {
					return <Documents key='documents' data={data} companySlug={companySlug} />;
				}}
			</CompanyEditLayout>
		</>
	);
};

export default BusinessDocumentEditPage;
