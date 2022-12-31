import { useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';

import { GET_FIRST_LEVEL_COMMENTS } from '@/graphql/community';

export function useGetFirstLevelCommunityPostComments(postId: string, first: number = 10) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);
	const { data, loading, fetchMore } = useQuery(GET_FIRST_LEVEL_COMMENTS, {
		variables: {
			postId,
			first: first,
			// ...rest get from graphql codegen
		},
	});
	const response = data?.getComments?.comment.edges ?? [];
	const hasNextPage = data?.getComments?.comment.pageInfo?.hasNextPage;
	const after = data?.getComments?.comment.pageInfo?.endCursor;

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
