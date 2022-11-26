export type DiscussionCommentFormFields = {
	comment: string;
	description: string;
};

export type DiscussionCommentFormProps = {
	comment?: string;
	discussionId: string | string[] | undefined;
	placeholder?: string;
};
