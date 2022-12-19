import { Box } from '@/ui-elements/atoms/box';
import { CreatorContainer } from '@/shared-components/creator-container';
import { Feed } from '@/shared-components/feed';
import { FeedGallery } from '../feed-gallery';
import { FeedActions } from '../feed-actions';

type FeedsProps = {
	items: any;
};

export const Feeds = (props: FeedsProps) => {
	const { items } = props;
	return (
		<>
			<Box className='mb-8'>
				<Feed>
					<Feed.CreatorProfile>
						<div className='flex justify-between pl-2 pt-2'>
							<CreatorContainer
								avatar={items?.creator?.userProfile?.profileImage}
								userName={items?.creator?.username || items.creator?.fullName}
								fullName={items.creator?.fullName}
								createdAt={items.createdAt}
							/>
						</div>
					</Feed.CreatorProfile>
					<Feed.Description>
						<div className='ml-16 mt-4'>
							<p>{items.text}</p>
						</div>
					</Feed.Description>
					{items.communityPostMedia?.length > 0 && (
						<Feed.Gallery>
							<div className='ml-16 mt-4'>
								<FeedGallery images={items.communityPostMedia} />
							</div>
						</Feed.Gallery>
					)}
					<Feed.Actions>
						<div className='bg-slate-50 feed-actions mt-2 pb-4 pt-4 px-14 shadow-sm'>
							<FeedActions postId={items.id} likesData={[]} commentLength={0} isOnSale={false} />
						</div>
					</Feed.Actions>
				</Feed>
			</Box>
		</>
	);
};

export default Feeds;
