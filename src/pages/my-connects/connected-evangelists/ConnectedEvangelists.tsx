import { CompanyEdge } from '@/generated/graphql';
import { useUserFollowersQuery } from '@/hooks/services/useUsersService';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { Box } from '@/ui-elements/atoms/box';
import { EmptyComponent } from '@/ui-elements/atoms/empty-component';
import ConnectedEvangelist from './ConnectedEvangelist';

const ConnectedEvangelists = () => {
	const { response, loading, hasNextPage, onLoadMore } = useUserFollowersQuery(10);
	return (
		<>
			<Box>
				<div className='px-8 py-4'>
					<p className='font-bold text-lg text-primary'>Connycted Evangelists</p>
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
							{(response || []).map((myFollowers: any) => {
								const { node: follower } = myFollowers;
								if (follower?.id) {
									return <ConnectedEvangelist key={follower.id} follower={follower} />;
								}
							})}
						</InfiniteScroller>
					</LoaderDataComponent>
				</div>
			</Box>
		</>
	);
};

export default ConnectedEvangelists;
