import { Feed } from '@/shared-components/feeds/Feed';

import { Community, User } from '@/generated/graphql';
import CreatePost from '@/shared-components/create-post/CreatePost';

type CommunityHomeProps = {
	community: Community;
	authorizedUser: User;
};

const CommunityHome = (props: CommunityHomeProps) => {
	const { community, authorizedUser } = props;

	return (
		<div>
			<div className='flex'>
				<div className='flex flex-col gap-4 w-3/5'>
					<div>
						<CreatePost actions={['media', 'events']} />
					</div>
					<Feed post={[]} name={authorizedUser?.username} isOnSale={false} />
				</div>
				<div className='flex flex-col gap-4 ml-4 w-2/5'>
					{/* About */}
					<div className='bg-white p-4 rounded-md'>
						<span className='font-bold text-2xl'>About Community</span>
						<p
							className='py-1 text-slate-500'
							dangerouslySetInnerHTML={{ __html: community?.description || '' }}
						></p>
					</div>
					<div className='bg-white p-4 rounded-md'>
						<span className='font-bold text-2xl'>Trending Topics</span>
						<div className='flex flex-col gap-4 py-5'>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CommunityHome;
