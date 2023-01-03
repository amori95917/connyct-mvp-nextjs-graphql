import { User } from '@/generated/graphql';
import { CreatorContainer } from '@/shared-components/creator-container';
import { Feed } from '@/shared-components/feed';
import { Box } from '@/ui-elements/atoms/box';
import { useState } from 'react';
import { BrandComments } from '../comments/brand-feed-comments';
import { FeedActions } from '../feed-actions';
import { FeedGallery } from '../feed-gallery';

type FeedsProps = {
	items: any;
	authorizedUser: User;
};

export const Feeds = (props: FeedsProps) => {
	const { items, authorizedUser } = props;
	const [showCommentBox, setShowCommentBox] = useState(false);
	const handleCommentShow = () => {
		setShowCommentBox(true);
	};
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
								likesData={items.reactionCount}
								commentLength={items.commentCount}
								isOnSale={items.isOnSale}
								onCommentClickHandler={handleCommentShow}
							/>
						</div>
					</Feed.Actions>
					{showCommentBox && (
						<Feed.Comments>
							<div className='bg-slate-50 feed-actions mt-1 pb-4 shadow-sm'>
								<BrandComments authorizedUser={authorizedUser} postId={items.id} />
							</div>
						</Feed.Comments>
					)}
				</Feed>
			</Box>
		</>
	);
};

export default Feeds;
