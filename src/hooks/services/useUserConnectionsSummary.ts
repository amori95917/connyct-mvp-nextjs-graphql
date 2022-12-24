import { useQuery } from '@apollo/client';
import { USER_CONNECTIONS_SUMMARY } from '@/graphql/user';

export function useUserConnectionsSummary() {
	const { data, loading, error } = useQuery(USER_CONNECTIONS_SUMMARY);
	console.log('data', data);
	const response = data?.userConnectionsSummary;
	return { response, loading, error };
}
