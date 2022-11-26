import { useMutation } from '@apollo/client';

import {
	DISCUSSION_DOWNVOTE,
	DISCUSSION_UPVOTE,
	DISCUSSION_ANSWER_DOWNVOTE,
	DISCUSSION_ANSWER_UPVOTE,
} from '@/graphql/discussion/resolver';

const useDiscussionVote = (discussionId: string | string[] | undefined) => {
	const [upvote] = useMutation(DISCUSSION_UPVOTE);
	const [downvote] = useMutation(DISCUSSION_DOWNVOTE);

	const [answerUpvote] = useMutation(DISCUSSION_ANSWER_UPVOTE);
	const [answerDownvote] = useMutation(DISCUSSION_ANSWER_DOWNVOTE);

	const handelVoteUp = async () => {
		try {
			await upvote({
				variables: {
					input: {
						discussionId,
						vote: 'UPVOTE',
					},
				},
			});
		} catch (e) {
			console.error(new Error(e as string));
		}
	};

	const handelVoteDown = async () => {
		try {
			await downvote({
				variables: {
					input: {
						discussionId,
						vote: 'DOWNVOTE',
					},
				},
			});
		} catch (e) {
			console.error(new Error(e as string));
		}
	};

	const handleDiscussionAnswerVoteUp = async (discussionAnswerId: string, vote: number) => {
		try {
			await answerUpvote({
				variables: {
					input: {
						discussionId,
						discussionAnswerId,
						vote: 'UPVOTE',
					},
				},
			});
		} catch (e) {
			console.error(new Error(e as string));
		}
	};

	const handleDiscussionAnswerVoteDown = async (discussionAnswerId: string, vote: number) => {
		try {
			await answerUpvote({
				variables: {
					input: {
						discussionId,
						discussionAnswerId,
						vote: 'DOWNVOTE',
					},
				},
			});
		} catch (e) {
			console.error(new Error(e as string));
		}
	};

	return {
		handelVoteUp,
		handelVoteDown,
		handleDiscussionAnswerVoteUp,
		handleDiscussionAnswerVoteDown,
	};
};

export { useDiscussionVote };
