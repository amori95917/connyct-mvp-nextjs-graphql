import { useState } from 'react';

import { useCommentsQuery } from '@/hooks/services/useCommentsQuery';
import { CommentEdge } from 'src/generated/graphql';
import Comment from './Comment';

interface CommentsProps {
	postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
	const [activeComment, setActiveComment] = useState({ id: '', type: '' });
	const { comments } = useCommentsQuery(postId);
	return (
		<>
			{comments?.map((commentNode: CommentEdge) => {
				const { node } = commentNode;
				if (node) {
					return (
						<div key={node.id}>
							<Comment
								key={node.id}
								postId={postId}
								comment={node}
								activeComment={activeComment}
								setActiveComment={setActiveComment}
							/>
						</div>
					);
				}
			})}
		</>
	);
};

export default Comments;
