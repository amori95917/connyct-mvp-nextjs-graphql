import ReplyComment from './ReplyComment';
import { CommentProps } from './comments.types';
import { BaseComment } from './BaseComment';

const Comment = ({
	postId,
	comment,
	activeComment,
	setActiveComment,
	isGreaterThanSecondLevelDepth,
}: CommentProps) => {
	const { id, replies } = comment;
	const isEditing = activeComment && activeComment?.id === id && activeComment?.type === 'editing';
	const isReplying = activeComment && activeComment?.id === id && activeComment?.type === 'replying';

	return (
		<>
			{/* This is main comment */}
			<BaseComment
				postId={postId}
				comment={comment}
				commentType={'FeedComment'}
				isEditing={isEditing}
				isReplying={isReplying}
				setActiveComment={setActiveComment}
				// repliedToId
			/>

			{replies?.edges?.map(reply => {
				const isGreaterThanSecondLevel = 'repliedToReplyId' in reply.node;
				// for now we will use the same component used for comment but with two level depth
				return (
					<div className={`${isGreaterThanSecondLevel ? '' : 'ml-14'} replies`} key={reply.node.id}>
						<Comment
							isGreaterThanSecondLevelDepth={isGreaterThanSecondLevel}
							comment={reply.node}
							postId={postId}
							activeComment={activeComment}
							setActiveComment={setActiveComment}
						/>
					</div>
				);
			})}
			{replies?.totalCount > 1 ? (
				<div className='flex justify-end relative right-0'>
					<button className='bg-gray-100 p-2 rounded-md'>show more</button>{' '}
				</div>
			) : (
				''
			)}
			<div className={`${isGreaterThanSecondLevelDepth ? '' : 'pl-10'}`}>
				{isReplying && <ReplyComment postId={postId} commentId={id} />}
			</div>
		</>
	);
};

export default Comment;
