const voteType = {
	UPVOTE: 'UPVOTE',
	DOWNVOTE: 'DOWNVOTE',
};

export const handelVoteUp = async (
	upvote: any,
	variables: {},
	setVote: (vote: number) => void,
	vote: number
) => {
	try {
		const response = await upvote({
			variables: {
				input: { ...variables, vote: voteType.UPVOTE },
			},
		});
	} catch (e) {}
	setVote(vote + 1);
};

export const handelVoteDown = async (downvote: any, variables: {}) => {
	try {
		const response = await downvote({
			variables: {
				input: { ...variables, vote: voteType.DOWNVOTE },
			},
		});
	} catch (e) {}
};
