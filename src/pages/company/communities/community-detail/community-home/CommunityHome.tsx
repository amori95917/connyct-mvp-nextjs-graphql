import { CommunityPostEdge } from '@/generated/graphql';
import { useCommunityFeedsQuery } from '@/hooks/services/useCommunityFeedsQuery';
import CreatePost from '@/shared-components/create-post/CreatePost';
import { Feed } from '@/shared-components/community/community-feeds';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { FeedLoader } from '@/shared-components/skeleton-loader/FeedLoader';
import { useCommunityFeedCreateMutation } from '@/hooks/services/useCommunityFeedMutation';
import { CommunityFeeds } from '@/shared-components/feed-components/community-feeds';

type CommunityHomeProps = {
	communitySlug: string;
};

const CommunityHome = (props: CommunityHomeProps) => {
	const { communitySlug } = props;
	const { response, loading, hasNextPage, onLoadMore } = useCommunityFeedsQuery(communitySlug);
	const {
		createCommunityFeed,
		loading: feedCreationLoading,
		error,
	} = useCommunityFeedCreateMutation(communitySlug);
	const onPostSubmit = async val => {
		console.log('val', val);
		await createCommunityFeed({
			variables: {
				input: {
					text: val.status || '',
					tags: val.tags || [],
					communityId: communitySlug,
					description: val.status || '',
				},
				...(val.files?.length > 0 && { files: val.files }),
			},
		});
	};
	return (
		<>
			<div className='flex flex-col'>
				<div className='mb-10'>
					<CreatePost actions={['media', 'events', 'products']} onPostSubmit={onPostSubmit} />
				</div>
				<LoaderDataComponent isLoading={loading} data={response} fallback={<FeedLoader />}>
					<InfiniteScroller
						loading={loading}
						scrollableTop={true}
						hasNextPage={hasNextPage}
						onLoadMore={onLoadMore}
					>
						{(response || []).map((postNode: CommunityPostEdge) => {
							const { node } = postNode;
							if (node) {
								return <CommunityFeeds key={node?.id} items={node} />;
							}
						})}
					</InfiniteScroller>
				</LoaderDataComponent>
			</div>
		</>
	);
};

export default CommunityHome;
