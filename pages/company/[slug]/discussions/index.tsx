import { useRouter } from 'next/router';

import { Navbar } from '@/shared-components/navbar';
import { CompanyLayout } from '@/shared-components/layouts';
import { Discussions } from '@/pages/company/discussions';
import { getSlug } from '@/utils/getSlug';

const DiscussionsPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);

	return (
		<>
			<Navbar />
			{companySlug && (
				<CompanyLayout companySlug={companySlug}>
					<Discussions companySlug={companySlug} />
				</CompanyLayout>
			)}
		</>
	);
};

DiscussionsPage.auth = true;
export default DiscussionsPage;
