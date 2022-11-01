import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_COMMENTS } from '@/graphql/feeds';
import { CommentDataProps } from './comments.types';
import Comment from './Comment';
import { useCommentsQuery } from '@/hooks/services/useCommentsQuery';
import { CommentEdge } from 'src/generated/graphql';

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
				return (
					<div key={node?.id}>
						<Comment
							key={node?.id}
							postId={postId}
							comment={node}
							activeComment={activeComment}
							setActiveComment={setActiveComment}
						/>
					</div>
				);
			})}
		</>
	);
};

export default Comments;
