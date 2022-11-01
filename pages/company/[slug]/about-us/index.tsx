import { useRouter } from 'next/router';

import { Navbar } from '@/shared-components/navbar';
import { CompanyLayout } from '@/shared-components/layouts';
import { AboutUs } from '@/pages/company/about-us';

function getSlug(slug: string | string[] | undefined) {
	if (slug === undefined) return '';
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug)) return slug[0];
}

const AboutUsPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	let companySlug = getSlug(slug);

	return (
		<>
			<Navbar />
			<CompanyLayout companySlug={companySlug || ''}>
				<AboutUs companySlug={companySlug || ''} />
			</CompanyLayout>
		</>
	);
};

export default AboutUsPage;
