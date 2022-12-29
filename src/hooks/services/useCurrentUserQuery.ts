import { useQuery } from '@apollo/client';

import { CURRENT_USER_QUERY } from '@/graphql/user';

export const useCurrentUser = () => {
	const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
	// const cachedUserData = cache.readQuery({ query: CURRENT_USER_QUERY });
	// console.log('cachedUserData', cachedUserData);
	const currentUser = data?.me;
	return {
		currentUser,
		loading,
		error,
	};
};

// import { useQuery } from '@apollo/client';

// import { cache } from '@/lib/apollo';
// import { CURRENT_USER_QUERY } from '@/graphql/user';

// export const useCurrentUser = () => {
// 	const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
// 	if (loading || error) return { loading, error };

// 	if (!data || !data.me) {
// 		// If the data is not present in the cache, make a network request
// 		// to fetch the latest data and update the cache.
// 		const { data: updatedData } = await client.query({
// 			query: CURRENT_USER_QUERY,
// 		});
// 		cache.writeQuery({
// 			query: CURRENT_USER_QUERY,
// 			data: updatedData,
// 		});
// 	}

// 	return {
// 		response: data.me,
// 		loading,
// 	};
// };
