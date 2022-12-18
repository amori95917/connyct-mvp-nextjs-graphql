import { useRouter } from 'next/router';

import { Navbar } from '@/shared-components/navbar';
import { CompanyLayout } from '@/shared-components/layouts';
import { CompanyFeeds } from '@/pages/company/feeds';
import { getSlug } from '@/utils/getSlug';

const CompanyFeedsPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);

	return (
		<>
			<Navbar />
			{companySlug && (
				<CompanyLayout companySlug={companySlug}>
					<CompanyFeeds companySlug={companySlug} />
				</CompanyLayout>
			)}
		</>
	);
};

export default CompanyFeedsPage;
