import { useRouter } from 'next/router';
import { Navbar } from '@/shared-components/navbar';

import { CompanyLayout } from '@/shared-components/layouts';
import { CommunityHead, CommunityHome } from '@/shared-components/community';
import { getSlug } from '@/utils/getSlug';

export const CommunityDetail = () => {
	const router = useRouter();
	const { slug: comSlug, communitySlug: commSlug } = router.query;
	let companySlug = getSlug(comSlug);
	let communitySlug = getSlug(commSlug) || '';
	return (
		<>
			<Navbar />
			<CompanyLayout companySlug={companySlug || ''}>
				<CommunityHead
					coverImage='/images/community/background.jpg'
					profileImage='/images/community/background.jpg'
					communityName='My Community'
					groupStatus='Public Group'
					members='0k'
					companySlug={companySlug}
					communitySlug={communitySlug}
				/>
				<div className='mt-6'>
					<CommunityHome />
				</div>
			</CompanyLayout>
		</>
	);
};
