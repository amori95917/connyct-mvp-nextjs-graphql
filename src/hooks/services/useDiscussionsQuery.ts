import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { produce } from 'immer';

import { Query } from '@/generated/graphql';
import { GET_DISCUSSION } from '@/graphql/discussion/resolver';

export function useDiscussionsQuery(companySlug: string, first: number = 10) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);

	const { data, fetchMore, loading } = useQuery(GET_DISCUSSION, {
		fetchPolicy: 'cache-and-network',
		variables: {
			companyId: companySlug,
			first: first,
		},
	});

	// const feeds = useMemo(() => data?.getCompanyDiscussion?.edges ?? [], [data]);
	const discussions = data?.getCompanyDiscussion?.edges ?? [];
	const hasNextPage = data?.getCompanyDiscussion?.pageInfo?.hasNextPage;
	const after = data?.getCompanyDiscussion?.pageInfo?.endCursor;

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
					companyId: companySlug,
					after,
				},
				updateQuery: (prev, { fetchMoreResult }: any) => {
					if (!fetchMoreResult) return prev;
					const connection = fetchMoreResult.getCompanyDiscussion;
					return produce(prev, (draft: Pick<Query, 'getCompanyDiscussion'>) => {
						if (draft?.getCompanyDiscussion?.totalCount) {
							draft.getCompanyDiscussion = {
								pageInfo: connection.pageInfo,
								edges: draft?.getCompanyDiscussion?.edges?.concat(connection.edges),
								totalCount: connection.totalCount,
								// eslint-disable-next-line no-underscore-dangle
								__typename: draft?.getCompanyDiscussion?.__typename,
							};
						}
					});
				},
			});
		}
	};

	return {
		discussions,
		loading,
		hasNextPage,
		onLoadMore,
	};
}
