import { useRef, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_COMMUNITIES, GET_COMMUNITIES_BY_ID } from '@/graphql/community';

export function useCommunityQuery(companyId: string, first: number = 10) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);

	const { data, fetchMore, loading } = useQuery(GET_COMMUNITIES, {
		variables: {
			companyId,
			first,
		},
	});

	const communities = data?.getCommunity?.community?.edges ?? [];
	const hasNextPage = data?.getCommunity?.community?.pageInfo?.hasNextPage;
	const after = data?.getCommunity?.community?.pageInfo?.endCursor;

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
					companyId,
					after,
				},
			});
		}
	};

	return {
		communities,
		loading,
		hasNextPage,
		onLoadMore,
	};
}

export function useCommunityQueryById(communitySlug: string) {
	const { data, loading } = useQuery(GET_COMMUNITIES_BY_ID, {
		fetchPolicy: 'cache-and-network',
		variables: {
			communityId: communitySlug,
		},
	});

	const communityData = data?.getCommunityById ?? null;

	return {
		communityData,
		loading,
	};
}
