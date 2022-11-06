import { useState, useEffect, useMemo, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { produce } from 'immer';

import { Query } from 'src/generated/graphql';
import { GET_COMPANY_POST } from '@/graphql/feeds';
import { getCookie } from '@/utils/cookies';

export function useFeedsQuery(brandId: string) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);
	const { company } = getCookie('CONNYCT_USER');

	const [loadFeeds, { data, fetchMore, loading }] = useLazyQuery(GET_COMPANY_POST, {
		fetchPolicy: 'cache-and-network',
	});

	useEffect(() => {
		if (brandId || company) {
			loadFeeds({
				variables: {
					id: brandId || company[0].id,
					first: 3,
				},
			});
		}
	}, []);

	// const feeds = useMemo(() => data?.postsByCompanyId?.edges ?? [], [data]);
	const feeds = data?.postsByCompanyId?.edges ?? [];
	const hasNextPage = data?.postsByCompanyId?.pageInfo?.hasNextPage;
	const after = data?.postsByCompanyId?.pageInfo?.endCursor;

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
					id: brandId || company[0].id,
					after,
				},
				updateQuery: (prev, { fetchMoreResult }: any) => {
					if (!fetchMoreResult) return prev;
					const connection = fetchMoreResult.postsByCompanyId;
					return produce(prev, (draft: Pick<Query, 'postsByCompanyId'>) => {
						if (draft?.postsByCompanyId?.totalCount) {
							draft.postsByCompanyId = {
								pageInfo: connection.pageInfo,
								edges: draft?.postsByCompanyId?.edges?.concat(connection.edges),
								totalCount: connection.totalCount,
								// eslint-disable-next-line no-underscore-dangle
								__typename: draft?.postsByCompanyId?.__typename,
							};
						}
					});
				},
			});
		}
	};

	return {
		feeds,
		loading,
		hasNextPage,
		onLoadMore,
	};
}
