import { useRef, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_COMMUNITIES_MEMBERS } from '@/graphql/community';

export function useCommunityMembers(communityId: string, first: number = 10) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);

	const { data, fetchMore, loading } = useQuery(GET_COMMUNITIES_MEMBERS, {
		variables: {
			communityId,
			first,
		},
	});

	const response = data?.getCommunityMember?.communityMember?.edges ?? [];
	const hasNextPage = data?.getCommunityMember?.communityMember?.pageInfo?.hasNextPage;
	const after = data?.getCommunityMember?.communityMember?.pageInfo?.endCursor;
	const totalCount = data?.getCommunityMember?.communityMember?.totalCount;

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
					communityId,
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
		totalCount,
	};
}
