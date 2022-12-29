import { useMutation } from '@apollo/client';

import { SWITCH_ACCOUNT } from '@/graphql/auth';
import { CURRENT_USER_QUERY } from '@/graphql/user';

export function useAccountSwitchMutation() {
	const [switchAccount, { loading, error, data }] = useMutation(SWITCH_ACCOUNT, {
		refetchQueries: [
			{
				query: CURRENT_USER_QUERY,
			},
		],
	});
	return { switchAccount, loading, error, data };
}
