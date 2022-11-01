import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { Feed as CompanyFeed } from '@/shared-components/feed';
import { FeedActions } from '@/shared-components/feed-actions';
import Comments from './comments/Comments';
import CreateComment from './comments/CreateComment';
import { GET_REACTIONS_POST } from '@/graphql/feeds';
import { Maybe, Post } from '@/generated/graphql';

type FeedProps = {
	post: Maybe<Post> | undefined;
	name: string;
	isOnSale: boolean;
};

const Feed: React.FC<FeedProps> = ({ post, name, isOnSale }) => {
	const { tags = [], postImage, text = '', comments = [], id, createdAt, companyId } = post ?? {};
	const { data: likesData } = useQuery(GET_REACTIONS_POST, {
		variables: { postId: id },
	});

	const [showCommentSection, setShowCommentSection] = useState(false);
	const onCommentClickHandler = () => {
		setShowCommentSection(!showCommentSection);
	};
	return (
		<>
			{post ? (
				<div className='bg-white mt-5 rounded-md w-full'>
					<CompanyFeed
						name={name}
						text={text}
						gallery={postImage}
						createdAt={createdAt}
						tags={tags}
						companyId={companyId}
					/>
					<div className='p-5'>
						<FeedActions
							postId={id}
							likesData={likesData}
							commentLength={comments.length}
							isOnSale={isOnSale}
							onCommentClickHandler={onCommentClickHandler}
						/>
						{showCommentSection && (
							<>
								<CreateComment postId={id} />
								<div className='max-h-96 no-scrollbar overflow-y-scroll pt-6'>
									<Comments postId={id} />
								</div>
							</>
						)}
					</div>
				</div>
			) : (
				<p>No Post</p>
			)}
		</>
	);
};

export default Feed;
