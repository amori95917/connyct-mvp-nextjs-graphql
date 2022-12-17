import { useMutation } from '@apollo/client';

import { COMMUNITY_FEEDS, CREATE_COMMUNITY_POST } from '@/graphql/community';

export function useCommunityFeedCreateMutation(communitySlug: string) {
	const [createCommunityFeed, { loading, error }] = useMutation(CREATE_COMMUNITY_POST, {
		refetchQueries: [
			{
				query: COMMUNITY_FEEDS,
				variables: {
					communityId: communitySlug,
					first: 10,
				},
			},
		],
	});
	return { createCommunityFeed, loading, error };
}
