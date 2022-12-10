import { useRouter } from 'next/router';

import { Navbar } from '@/shared-components/navbar';
import { CompanyLayout } from '@/shared-components/layouts';
import { Communities } from '@/pages/company/communities';
import { getSlug } from '@/utils/getSlug';

const CommunitiesPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);
	return (
		<>
			<Navbar />
			{companySlug && (
				<CompanyLayout companySlug={companySlug}>
					<Communities companySlug={companySlug} />
				</CompanyLayout>
			)}
		</>
	);
};

export default CommunitiesPage;
