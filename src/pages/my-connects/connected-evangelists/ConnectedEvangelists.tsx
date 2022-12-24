import { CompanyEdge } from '@/generated/graphql';
import { useCompaniesFollowedByUser } from '@/hooks/services/useCompaniesFollowedByUser';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { Box } from '@/ui-elements/atoms/box';
import { EmptyComponent } from '@/ui-elements/atoms/empty-component';
import ConnectedEvangelist from './ConnectedEvangelist';

const ConnectedEvangelists = () => {
	const { response, loading, hasNextPage, onLoadMore } = useCompaniesFollowedByUser(10);
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
							{(response || []).map((recommendedBrand: CompanyEdge) => {
								const { node: brand } = recommendedBrand;
								if (brand?.id) {
									return <ConnectedEvangelist key={brand.id} brand={brand} />;
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
