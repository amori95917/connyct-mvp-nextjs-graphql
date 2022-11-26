export type DiscussionAnswerReplyFormFields = {
	comment: string;
	description: string;
};

export type DiscussionAnswerReplyFormProps = {
	comment?: string;
	discussionId: string | string[] | undefined;
	placeholder?: string;
	answerId: string;
};
