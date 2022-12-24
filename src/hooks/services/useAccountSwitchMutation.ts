import { useMutation } from '@apollo/client';

import { SWITCH_ACCOUNT } from '@/graphql/auth';

export function useAccountSwitchMutation() {
	const [switchAccount, { loading, error, data }] = useMutation(SWITCH_ACCOUNT, {
		// refetchQueries: [
		// 	{
		// 		query: COMMUNITY_FEEDS,
		// 		variables: {
		// 			communityId: communitySlug,
		// 			first: 10,
		// 		},
		// 	},
		// ],
	});
	return { switchAccount, loading, error, data };
}
