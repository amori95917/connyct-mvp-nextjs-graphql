import { useQuery } from '@apollo/client';
import { GET_COMMUNITY } from '@/graphql/community';

export function useCommunityQuery(companyId: string) {
	const { data, loading } = useQuery(GET_COMMUNITY, {
		variables: {
			companyId,
		},
	});

	const communities = data?.community?.community ?? [];

	return {
		communities,
		loading,
	};
}
