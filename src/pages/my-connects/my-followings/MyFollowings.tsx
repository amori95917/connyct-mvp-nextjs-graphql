import { useUserFollowingQuery } from '@/hooks/services/useUsersService';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { Box } from '@/ui-elements/atoms/box';
import { EmptyComponent } from '@/ui-elements/atoms/empty-component';
import MyFollowing from './MyFollowing';

const MyFollowings = () => {
	const { response, loading, hasNextPage, onLoadMore } = useUserFollowingQuery(10);
	return (
		<>
			<Box>
				<div className='px-8 py-4'>
					<p className='font-bold text-lg text-primary'>Evangelists I Follow</p>
					<LoaderDataComponent
						isLoading={loading}
						data={response}
						emptyComponent={
							<EmptyComponent
								text='No mutual evangelists'
								subText='We recommend you to follow as much evangelists you can from the brands you are connected'
							/>
						}>
						<InfiniteScroller
							loading={loading}
							scrollableTop={true}
							hasNextPage={hasNextPage}
							onLoadMore={onLoadMore}>
							{(response || []).map((myFollowings: any) => {
								const { node: following } = myFollowings;
								if (following?.id) {
									return <MyFollowing key={following.id} following={following} />;
								}
							})}
						</InfiniteScroller>
					</LoaderDataComponent>
				</div>
			</Box>
		</>
	);
};

export default MyFollowings;
