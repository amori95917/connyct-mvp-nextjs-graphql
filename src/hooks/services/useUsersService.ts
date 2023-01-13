import { useQuery } from '@apollo/client';
import { GET_USER_FOLLOWERS, GET_USER_FOLLOWING } from '@/graphql/user';

export function useUserFollowersQuery(first = 3) {
	const { data, fetchMore, loading } = useQuery(GET_USER_FOLLOWERS, {
		variables: {
			first,
		},
	});

	const response = data?.userFollowers?.edges ?? [];
	const hasNextPage = data?.userFollowers?.pageInfo?.hasNextPage;
	const after = data?.userFollowers?.pageInfo?.endCursor;

	const onLoadMore = () => {
		if (fetchMore) {
			fetchMore({
				variables: {
					after,
				},
			});
		}
	};

	return {
		response,
		loading,
		onLoadMore,
		hasNextPage,
		after,
	};
}

export function useUserFollowingQuery(first = 3) {
	const { data, fetchMore, loading } = useQuery(GET_USER_FOLLOWING, {
		variables: {
			first,
		},
	});

	const response = data?.userFollowing?.edges ?? [];
	const hasNextPage = data?.userFollowing?.pageInfo?.hasNextPage;
	const after = data?.userFollowing?.pageInfo?.endCursor;

	const onLoadMore = () => {
		if (fetchMore) {
			fetchMore({
				variables: {
					after,
				},
			});
		}
	};

	return {
		response,
		loading,
		onLoadMore,
		hasNextPage,
		after,
	};
}
