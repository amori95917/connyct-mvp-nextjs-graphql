import { useRouter } from 'next/router';

import { Navbar } from '@/shared-components/navbar';
import { CompanyEditLayout } from '@/shared-components/layouts/company-edit-layout/CompanyEditLayout';
import GeneralInfoForm from '@/pages/company/edit/business-information/general/GeneralInfoForm';
import { getSlug } from '@/utils/getSlug';

const BusinessGeneralEditPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);

	return (
		<>
			<Navbar />
			{companySlug && (
				<CompanyEditLayout companySlug={companySlug} type='business-information'>
					{(data: any) => {
						if (data) return <GeneralInfoForm data={data} />;
					}}
				</CompanyEditLayout>
			)}
		</>
	);
};

export default BusinessGeneralEditPage;
