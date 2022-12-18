import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';

import { GET_COMPANY_POST } from '@/graphql/feeds';

export function useCompanyFeedsQuery(companySlug: string, first: number = 2) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);

	const { data, fetchMore, loading } = useQuery(GET_COMPANY_POST, {
		fetchPolicy: 'cache-and-network',
		variables: {
			id: companySlug,
			first,
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
