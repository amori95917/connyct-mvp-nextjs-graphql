import { useQuery } from '@apollo/client';

import { GET_DISCUSSION_BY_ID } from '@/graphql/discussion/resolver';

export function useDiscussionQueryById(discussionSlug: string | string[] | undefined) {
	const { data, loading } = useQuery(GET_DISCUSSION_BY_ID, {
		fetchPolicy: 'cache-and-network',
		variables: {
			discussionId: discussionSlug,
		},
	});

	const discussion = data?.getCompanyDiscussionById ?? null;

	return {
		discussion,
		loading,
	};
}
