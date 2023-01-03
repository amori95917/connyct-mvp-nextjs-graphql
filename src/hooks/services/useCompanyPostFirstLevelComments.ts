import { useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';

import { GET_POST_FIRST_LEVEL_COMMENTS } from '@/graphql/feeds';

export function useCompanyPostFirstLevelComments(postId: string, first: number = 3) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);
	const { data, loading, fetchMore } = useQuery(GET_POST_FIRST_LEVEL_COMMENTS, {
		variables: {
			postId,
			first: first,
			// ...rest get from graphql codegen
		},
	});
	const response = data?.getPostsComments?.data.edges ?? [];
	const hasNextPage = data?.getPostsComments?.data.pageInfo?.hasNextPage;
	const after = data?.getPostsComments?.data.pageInfo?.endCursor;

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
