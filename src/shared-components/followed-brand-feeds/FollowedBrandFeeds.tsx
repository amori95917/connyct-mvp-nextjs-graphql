import Link from 'next/link';
import { UilNewspaper } from '@iconscout/react-unicons';

import { EmptyComponent } from '@/ui-elements/atoms/empty-component';
import { InfiniteScroller } from '../infinite-scroller';
import { LoaderDataComponent } from '../loader-data-component';
import { FeedLoader } from '../skeleton-loader/FeedLoader';

const FollowedBrandFeeds = () => {
	return (
		<>
			<LoaderDataComponent
				isLoading={false}
				data={[]}
				fallback={<FeedLoader />}
				emptyComponent={
					<EmptyComponent
						text='No feeds found'
						subText='You need to follow a brand to view the feeds'
						icon={<UilNewspaper size={64} className='fill-primary' />}
						ctaButton={
							<Link href={'/my-connects'} passHref>
								<button className='bg-primary font-semibold mt-6 px-10 py-3 text-white'>
									Follow Companies
								</button>
							</Link>
						}
					/>
				}
			>
				<InfiniteScroller
					loading={false}
					scrollableTop={true}
					hasNextPage={false}
					onLoadMore={() => console.log('load more')}
				>
					{[].length > 0 ? <p>Data</p> : null}
				</InfiniteScroller>
			</LoaderDataComponent>
		</>
	);
};

export default FollowedBrandFeeds;
