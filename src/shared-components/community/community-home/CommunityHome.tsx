import { Community, CommunityPostEdge, User } from '@/generated/graphql';
import { COMMUNITY_FEEDS, CREATE_COMMUNITY_POST } from '@/graphql/community';
import { useCommunityFeedsQuery } from '@/hooks/services/useCommunityFeedsQuery';
import CreatePost from '@/shared-components/create-post/CreatePost';
import { CommunityFeeds } from '@/shared-components/feed-components/community-feeds';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { FeedLoader } from '@/shared-components/skeleton-loader/FeedLoader';
import { useMutation } from '@apollo/client';

type CommunityHomeProps = {
	community: Community;
	authorizedUser: User;
};

const CommunityHome = (props: CommunityHomeProps) => {
	const { community, authorizedUser } = props;
	const { response, loading, hasNextPage, onLoadMore } = useCommunityFeedsQuery(community.id, 10);
	const [createCommunityPost, { data: communityPostData, loading: communityPostSubmitting }] =
		useMutation(CREATE_COMMUNITY_POST);

	const handleCommunityPost = async val => {
		console.log('val', val); // text, communityId, tags
		const { status, images } = val;
		await createCommunityPost({
			variables: {
				input: {
					text: status,
					communityId: community.id,
				},
			},
			refetchQueries: [
				{
					query: COMMUNITY_FEEDS,
					variables: {
						communityId: community.id,
						first: 10,
					},
				},
			],
		});
	};

	return (
		<div>
			<div className='flex'>
				<div className='flex flex-col gap-4 w-3/5'>
					<div>
						<CreatePost
							actions={['media', 'events']}
							authorizedUser={authorizedUser}
							onPostSubmit={handleCommunityPost}
							submitting={communityPostSubmitting}
						/>
					</div>
					<LoaderDataComponent isLoading={loading} data={response} fallback={<FeedLoader />}>
						<InfiniteScroller
							loading={loading}
							scrollableTop={true}
							hasNextPage={hasNextPage}
							onLoadMore={onLoadMore}>
							{(response || []).map((postNode: CommunityPostEdge) => {
								const { node } = postNode;
								if (node) {
									return <CommunityFeeds key={node.id} items={node} />;
								}
							})}
						</InfiniteScroller>
					</LoaderDataComponent>
				</div>
				<div className='flex flex-col gap-4 ml-4 w-2/5'>
					{/* About */}
					<div className='bg-white p-4 rounded-md'>
						<span className='font-bold text-2xl'>About Community</span>
						<p
							className='py-1 text-slate-500'
							dangerouslySetInnerHTML={{ __html: community?.description || '' }}></p>
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
