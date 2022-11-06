export interface Creator {
	fullName: string;
}
export interface CommentDataProps {
	id: string;
	text: string;
	creator: Creator;
	// replies: Omit<CommentProps, 'replies' | 'commentId'>;
	replies: any;
	mentions: any;
	createdAt: Date;
}

export interface Comment extends CommentDataProps {}

export interface ActiveComment {
	id: string;
	type: 'editing' | 'replying';
}

export interface CommentProps {
	comment: Comment;
	activeComment?: ActiveComment;
	postId: string;
	setActiveComment: (comment: ActiveComment) => void;
	isGreaterThanSecondLevelDepth?: boolean;
}

export interface BaseCommentProps extends CommentProps {
	isEditing?: boolean;
	isReplying?: boolean;
	commentType?: 'FeedComment';
	commentWrapperCss?: string;
	shadowBoxCss?: string;
}
