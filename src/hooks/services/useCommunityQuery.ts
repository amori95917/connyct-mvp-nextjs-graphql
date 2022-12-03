import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_COMMUNITY } from '@/graphql/community';

export function useCommunityQuery(companyId: string) {
	const [loadCommunities, { data, fetchMore, loading }] = useLazyQuery(GET_COMMUNITY, {
		fetchPolicy: 'cache-and-network',
	});
	useEffect(() => {
		loadCommunities({
			variables: {
				companyId,
			},
		});
	}, [companyId]);

	const communities = data?.community?.community ?? [];

	return {
		communities,
		loading,
	};
}
