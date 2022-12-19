import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';

import { COMMUNITY_FEEDS } from '@/graphql/community';

export function useCommunityFeedsQuery(communitySlug: string, first: number = 2) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);

	const { data, fetchMore, loading } = useQuery(COMMUNITY_FEEDS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			communityId: communitySlug,
			first: first,
		},
	});

	// const feeds = useMemo(() => data?.postsByCompanyId?.edges ?? [], [data]);
	const response = data?.communityPost?.communityPost?.edges ?? [];
	const hasNextPage = data?.communityPost?.communityPost?.pageInfo?.hasNextPage;
	const after = data?.communityPost?.communityPost?.pageInfo?.endCursor;

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
					communitySlug,
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
