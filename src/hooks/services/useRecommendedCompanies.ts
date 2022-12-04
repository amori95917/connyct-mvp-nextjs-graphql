import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import produce from 'immer';

import { SUGGESTION_COMPANIES } from '@/graphql/company';
import { Query } from '@/generated/graphql';

export function useRecommendedCompanies(first: number = 10) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);
	const { data, loading, fetchMore } = useQuery(SUGGESTION_COMPANIES, {
		variables: {
			first: first,
		},
	});
	const response = data?.companiesSuggestions?.edges ?? [];
	const hasNextPage = data?.companiesSuggestions?.pageInfo?.hasNextPage;
	const after = data?.companiesSuggestions?.pageInfo?.endCursor;

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
				// NOT NEEDED as we are using relayStylePagination from apollo client utilities

				// updateQuery: (prev, { fetchMoreResult }: any) => {
				// 	if (!fetchMoreResult) return prev;
				// 	const connection = fetchMoreResult.companiesSuggestions;
				// 	return produce(prev, (draft: Pick<Query, 'companiesSuggestions'>) => {
				// 		if (draft?.companiesSuggestions?.totalCount) {
				// 			draft.companiesSuggestions = {
				// 				pageInfo: connection.pageInfo,
				// 				edges: draft?.companiesSuggestions?.edges?.concat(connection.edges),
				// 				totalCount: connection.totalCount,
				// 				// eslint-disable-next-line no-underscore-dangle
				// 				__typename: draft?.companiesSuggestions?.__typename,
				// 			};
				// 		}
				// 	});
				// },
			});
		}
	};

	return {
		response,
		loading,
		hasNextPage,
		onLoadMore,
	};
}
