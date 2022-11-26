import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { produce } from 'immer';

import { Query } from '@/generated/graphql';
import { GET_DISCUSSION_ANSWER } from '@/graphql/discussion/resolver';

export function useDiscussionAnswersQuery(
	discussionSlug: string | string[] | undefined,
	first: number = 10
) {
	const observerRef = useRef<any>(null);
	const [buttonRef, setButtonRef] = useState<any>(null);

	const { data, fetchMore, loading } = useQuery(GET_DISCUSSION_ANSWER, {
		fetchPolicy: 'cache-and-network',
		variables: {
			discussionId: discussionSlug,
			first: first,
		},
	});

	// const feeds = useMemo(() => data?.getCompanyDiscussion?.edges ?? [], [data]);
	const discussionAnswers = data?.getDiscussionAnswerByDiscussionId?.edges ?? [];
	const hasNextPage = data?.getDiscussionAnswerByDiscussionId?.pageInfo?.hasNextPage;
	const after = data?.getDiscussionAnswerByDiscussionId?.pageInfo?.endCursor;

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
					companyId: discussionSlug,
					after,
				},
				updateQuery: (prev, { fetchMoreResult }: any) => {
					if (!fetchMoreResult) return prev;
					const connection = fetchMoreResult.getDiscussionAnswer;
					return produce(prev, (draft: Pick<Query, 'getDiscussionAnswerByDiscussionId'>) => {
						if (draft?.getDiscussionAnswerByDiscussionId?.totalCount) {
							draft.getDiscussionAnswerByDiscussionId = {
								pageInfo: connection.pageInfo,
								edges: draft?.getDiscussionAnswerByDiscussionId?.edges?.concat(connection.edges),
								totalCount: connection.totalCount,
								// eslint-disable-next-line no-underscore-dangle
								__typename: draft?.getDiscussionAnswerByDiscussionId?.__typename,
							};
						}
					});
				},
			});
		}
	};

	return {
		discussionAnswers,
		loading,
		hasNextPage,
		onLoadMore,
	};
}
