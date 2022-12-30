import { User } from '@/generated/graphql';
import { useCommunityQueryById } from '@/hooks/services/useCommunityQuery';
import { CommunityHead, CommunityHome } from '@/shared-components/community';
import { CommunityMembers } from './members';
import { Policies } from './policy';

type CommunityDetailProps = {
	companySlug: string;
	communitySlug: string;
	authorizedUser: User;
	page: 'HOME' | 'MEMBERS' | 'POLICY';
};

const CommunityDetail = (props: CommunityDetailProps) => {
	const { companySlug, communitySlug, authorizedUser, page } = props;
	const { loading, communityData } = useCommunityQueryById(communitySlug);

	if (loading) {
		// BETTER IF WE HAVE SKELETON
		return <p>Loading...</p>;
	}

	const { community } = communityData ?? {};

	if (community?.id) {
		return (
			<>
				<CommunityHead
					companySlug={companySlug}
					communitySlug={communitySlug}
					authorizedUser={authorizedUser}
					community={community}
				/>
				<div className='mt-6'>
					{page === 'HOME' && (
						<CommunityHome
							communitySlug={communitySlug}
							companySlug={companySlug}
							community={community}
							authorizedUser={authorizedUser}
						/>
					)}
					{page === 'MEMBERS' && (
						<CommunityMembers
							communitySlug={communitySlug}
							companySlug={companySlug}
							community={community}
							authorizedUser={authorizedUser}
						/>
					)}
					{page === 'POLICY' && (
						<Policies
							communitySlug={communitySlug}
							companySlug={companySlug}
							community={community}
							authorizedUser={authorizedUser}
						/>
					)}
				</div>
			</>
		);
	}
};

export default CommunityDetail;
