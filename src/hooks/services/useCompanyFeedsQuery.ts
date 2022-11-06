import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { produce } from 'immer';

import { Query } from '@/generated/graphql';
import { GET_COMPANY_POST } from '@/graphql/feeds';

export function useCompanyFeedsQuery(companySlug: string, first: number = 10) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);

	const { data, fetchMore, loading } = useQuery(GET_COMPANY_POST, {
		fetchPolicy: 'cache-and-network',
		variables: {
			id: companySlug,
			first: first,
		},
	});

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
					id: companySlug,
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
