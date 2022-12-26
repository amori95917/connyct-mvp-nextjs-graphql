import { useRouter } from 'next/router';

import { Navbar } from '@/shared-components/navbar';
import { CompanyLayout } from '@/shared-components/layouts';
import { AboutUs } from '@/pages/company/about-us';
import { getSlug } from '@/utils/getSlug';

const AboutUsPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);

	return (
		<>
			<Navbar />
			{companySlug && (
				<CompanyLayout companySlug={companySlug}>
					<AboutUs companySlug={companySlug} />
				</CompanyLayout>
			)}
		</>
	);
};

export default AboutUsPage;
