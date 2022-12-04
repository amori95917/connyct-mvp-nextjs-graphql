import { useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import produce from 'immer';

import { GET_POST_FOLLOWED_BY_USER } from '@/graphql/feeds';
import { Query } from '@/generated/graphql';

export function useCompanyFeedsFollowedByUser(first: number = 10) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);
	const [loadFeedsFollowedByUser, { loading, data, fetchMore }] =
		useLazyQuery(GET_POST_FOLLOWED_BY_USER);
	useEffect(() => {
		loadFeedsFollowedByUser({
			variables: {
				first,
			},
		});
	}, []);

	const response = data?.companyPostsFollowedByUser?.edges ?? [];
	const hasNextPage = data?.companyPostsFollowedByUser?.pageInfo?.hasNextPage;
	const after = data?.companyPostsFollowedByUser?.pageInfo?.endCursor;

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
