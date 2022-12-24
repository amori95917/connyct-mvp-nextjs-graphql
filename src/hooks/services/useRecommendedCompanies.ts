import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';

import { SUGGESTION_COMPANIES } from '@/graphql/company';

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
