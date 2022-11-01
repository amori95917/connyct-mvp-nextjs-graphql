import { useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import produce from 'immer';

import { GET_FOLLOWED_COMPANY } from '@/graphql/company';
import { Query } from '@/generated/graphql';

export function useCompaniesFollowedByUser(first: number = 10) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);
	// use useQuery rather
	const [loadCompaniesFollowedByUser, { loading, data, fetchMore }] =
		useLazyQuery(GET_FOLLOWED_COMPANY);
	useEffect(() => {
		loadCompaniesFollowedByUser({
			variables: {
				first,
			},
		});
	}, []);

	const response = data?.getCompanysFollowedByUser?.edges ?? [];
	const totalCount = data?.getCompanysFollowedByUser?.totalCount;
	const hasNextPage = data?.getCompanysFollowedByUser?.pageInfo?.hasNextPage;
	const after = data?.getCompanysFollowedByUser?.pageInfo?.endCursor;

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
					const connection = fetchMoreResult.getCompanysFollowedByUser;
					return produce(prev, (draft: Pick<Query, 'getCompanysFollowedByUser'>) => {
						if (draft?.getCompanysFollowedByUser?.totalCount) {
							draft.getCompanysFollowedByUser = {
								pageInfo: connection.pageInfo,
								edges: draft?.getCompanysFollowedByUser?.edges?.concat(connection.edges),
								totalCount: connection.totalCount,
								// eslint-disable-next-line no-underscore-dangle
								__typename: draft?.getCompanysFollowedByUser?.__typename,
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
