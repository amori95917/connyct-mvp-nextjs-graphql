import { useLazyQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';

import { GET_SECOND_LEVEL_COMMENTS } from '@/graphql/community/resolver';

export function useSecondLevelCommunityComments(commentId: string, first: number = 5) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);
	const [loadSecondLevelComments, { data, loading, fetchMore }] = useLazyQuery(
		GET_SECOND_LEVEL_COMMENTS
		// {
		// 	variables: {
		// 		commentId,
		// 		first: first,
		// 		// ...rest get from graphql codegen
		// 	},
		// }
	);
	const response = data?.getSecondLevelComments?.comment.edges ?? [];
	const hasNextPage = data?.getSecondLevelComments?.comment.pageInfo?.hasNextPage;
	const after = data?.getSecondLevelComments?.comment.pageInfo?.endCursor;

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
		loadSecondLevelComments,
		response,
		loading,
		hasNextPage,
		onLoadMore,
	};
}
