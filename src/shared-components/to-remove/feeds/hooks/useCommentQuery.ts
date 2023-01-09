import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_COMMENTS } from '@/graphql/feeds';

export function useCommentsQuery(postId: string) {
	const [loadComments, { data, fetchMore, loading }] = useLazyQuery(GET_COMMENTS, {
		fetchPolicy: 'cache-and-network',
	});
	useEffect(() => {
		loadComments({
			variables: {
				postId,
				first: 3,
			},
		});
	}, []);

	const comments = data?.comments?.comments?.edges ?? [];
	const hasNextPage = data?.comments?.comments?.pageInfo?.hasNextPage;
	const after = data?.comments?.comments?.pageInfo?.endCursor;

	return {
		comments,
		loading,
		hasNextPage,
		after,
	};
}
