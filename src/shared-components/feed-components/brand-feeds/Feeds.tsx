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
								avatar={items?.company?.avatar}
								userName={items?.company?.name || items?.company?.legalName}
								fullName={items?.company?.legalName}
								createdAt={items.createdAt}
							/>
						</div>
					</Feed.CreatorProfile>
					<Feed.Description>
						<div className='ml-12 mt-4'>
							<p>{items.text}</p>
						</div>
					</Feed.Description>
					{items.postImage?.length > 0 && (
						<Feed.Gallery>
							<div className='ml-12 mt-4'>
								<FeedGallery images={items.postImage} />
							</div>
						</Feed.Gallery>
					)}
					<Feed.Actions>
						<div className='bg-slate-50 feed-actions mt-2 pb-4 pt-4 px-8 shadow-sm'>
							<FeedActions
								postId={items.id}
								likesData={[]}
								commentLength={items.comments.length}
								isOnSale={items.isOnSale}
							/>
						</div>
					</Feed.Actions>
				</Feed>
			</Box>
		</>
	);
};

export default Feeds;
