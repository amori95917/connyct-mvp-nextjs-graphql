import { useRouter } from 'next/router';

import { CompanyLayout } from '@/shared-components/layouts';
import { Navbar } from '@/shared-components/navbar';
import { getSlug } from '@/utils/getSlug';
import { DiscussionLayout } from '@/shared-components/layouts/discussion-layout/DiscussionLayout';
import { DiscussionForm } from '@/pages/company/discussions/discussion-form';
import { DiscussionDetail } from '@/pages/company/discussions/discussion-detail/DiscussionDetail';

export const DiscussionPage = () => {
	const router = useRouter();
	const { slug, discussionSlug: discussionSlugVal } = router.query;
	let companySlug = getSlug(slug);
	let discussionSlug = getSlug(discussionSlugVal);

	return (
		<>
			<Navbar />
			{companySlug && discussionSlug && (
				<CompanyLayout companySlug={companySlug}>
					<DiscussionLayout companySlug={companySlug} DiscussionForm={DiscussionForm}>
						<DiscussionDetail companySlug={companySlug} discussionSlug={discussionSlug} />
					</DiscussionLayout>
				</CompanyLayout>
			)}
		</>
	);
};

DiscussionPage.auth = true;
export default DiscussionPage;
