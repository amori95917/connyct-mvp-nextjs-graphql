import { CommunityPostEdge } from '@/generated/graphql';
import { useCommunityFeedsQuery } from '@/hooks/services/useCommunityFeedsQuery';
import CreatePost from '@/shared-components/create-post/CreatePost';
import { Feed } from '@/shared-components/community/community-feeds';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { FeedLoader } from '@/shared-components/skeleton-loader/FeedLoader';

type CommunityHomeProps = {
	communitySlug: string;
};

const CommunityHome = (props: CommunityHomeProps) => {
	const { communitySlug } = props;
	const { response, loading, hasNextPage, onLoadMore } = useCommunityFeedsQuery(communitySlug);
	return (
		<>
			<CreatePost />
			<LoaderDataComponent isLoading={loading} data={response} fallback={<FeedLoader />}>
				<InfiniteScroller
					loading={loading}
					scrollableTop={true}
					hasNextPage={hasNextPage}
					onLoadMore={onLoadMore}>
					{(response || []).map((postNode: CommunityPostEdge) => {
						const { node } = postNode;
						if (node) {
							return <Feed key={node?.id} name={'User'} post={node} isOnSale={false} />;
						}
					})}
				</InfiniteScroller>
			</LoaderDataComponent>
		</>
	);
};

export default CommunityHome;
