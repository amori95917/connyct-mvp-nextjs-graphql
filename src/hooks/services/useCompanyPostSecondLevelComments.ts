import { useLazyQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';

import { GET_POST_SECOND_LEVEL_COMMENTS } from '@/graphql/feeds';

export function useCompanyPostSecondLevelComments(commentId: string, first: number = 5) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);
	const [loadPostSecondLevelComments, { data, loading, fetchMore }] = useLazyQuery(
		GET_POST_SECOND_LEVEL_COMMENTS
		// {
		// 	variables: {
		// 		commentId,
		// 		first: first,
		// 		// ...rest get from graphql codegen
		// 	},
		// }
	);
	const response = data?.getPostSecondLevelComments?.data.edges ?? [];
	const hasNextPage = data?.getPostSecondLevelComments?.data.pageInfo?.hasNextPage;
	const after = data?.getPostSecondLevelComments?.data.pageInfo?.endCursor;

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
		loadPostSecondLevelComments,
		response,
		loading,
		hasNextPage,
		onLoadMore,
	};
}
