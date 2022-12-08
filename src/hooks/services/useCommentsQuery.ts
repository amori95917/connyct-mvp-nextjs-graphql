import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '@/graphql/feeds';

export function useCommentsQuery(postId: string, first = 3) {
	const { data, fetchMore, loading } = useQuery(GET_COMMENTS, {
		variables: {
			postId,
			first,
		},
	});

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
