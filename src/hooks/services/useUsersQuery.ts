import { useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import produce from 'immer';

import { GET_USERS } from '@/graphql/user/resolver';
import { Query } from '@/generated/graphql';

export function useUsers(first: number = 10) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);
	const [loadUsers, { loading, data, fetchMore }] = useLazyQuery(GET_USERS);
	useEffect(() => {
		loadUsers({
			variables: {
				first,
			},
		});
	}, []);

	const response = data?.listUsers?.edges ?? [];
	const totalCount = data?.listUsers?.totalCount;
	const hasNextPage = data?.listUsers?.pageInfo?.hasNextPage;
	const after = data?.listUsers?.pageInfo?.endCursor;

	useEffect(() => {
		const currentObserver = observerRef?.current;
		if (buttonRef) {
			currentObserver?.observe(document.querySelector('#buttonLoadMore'));
		}
	}, [buttonRef]);

	const onLoadMore = () => {
		if (fetchMore) {
			fetchMore({
				variables: {
					after,
				},
				updateQuery: (prev, { fetchMoreResult }: any) => {
					if (!fetchMoreResult) return prev;
					const connection = fetchMoreResult.listUsers;
					return produce(prev, (draft: Pick<Query, 'listUsers'>) => {
						if (draft?.listUsers?.totalCount) {
							draft.listUsers = {
								pageInfo: connection.pageInfo,
								edges: draft?.listUsers?.edges?.concat(connection.edges),
								totalCount: connection.totalCount,
								// eslint-disable-next-line no-underscore-dangle
								__typename: draft?.listUsers?.__typename,
							};
						}
					});
				},
			});
		}
	};

	return {
		response,
		loading,
		hasNextPage,
		totalCount,
		onLoadMore,
	};
}
