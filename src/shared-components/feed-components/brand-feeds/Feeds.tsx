import { Box } from '@/ui-elements/atoms/box';
import { CreatorContainer } from '@/shared-components/creator-container';
import { Feed } from '@/shared-components/feed';

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
						<div className='flex justify-between'>
							<CreatorContainer
								avatar={items?.creator?.userProfile?.profileImage || 'https://i.pravatar.cc/'}
								fullName={items.creator?.fullName || 'Anonymous'}
								createdAt={items.createdAt}
							/>
						</div>
					</Feed.CreatorProfile>
					<Feed.Description>
						<div className='ml-12 mt-4'>
							<p>{items.text}</p>
						</div>
					</Feed.Description>
				</Feed>
			</Box>
		</>
	);
};

export default Feeds;
