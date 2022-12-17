import { CommunityPost } from '@/generated/graphql';

type FeedProps = {
	post: CommunityPost;
	name: string;
};

const Feed = (props: FeedProps) => {
	const { post, name } = props;
	return (
		<>
			<div className='bg-white mt-5 rounded-md w-full'>{post.text}</div>
		</>
	);
};

export default Feed;
