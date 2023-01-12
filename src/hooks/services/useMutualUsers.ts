import { useQuery } from '@apollo/client';
import { GET_MUTUAL_USERS } from '@/graphql/user';

export function useMutualUsersQuery(first = 3) {
	const { data, fetchMore, loading } = useQuery(GET_MUTUAL_USERS, {
		variables: {
			first,
		},
	});

	const response = data?.mutualUsers?.edges ?? [];
	const hasNextPage = data?.mutualUsers?.pageInfo?.hasNextPage;
	const after = data?.mutualUsers?.pageInfo?.endCursor;

	return {
		response,
		loading,
		fetchMore,
		hasNextPage,
		after,
	};
}
