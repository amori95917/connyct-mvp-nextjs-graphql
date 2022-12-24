import { CompanyEdge } from '@/generated/graphql';
import { useCompaniesFollowedByUser } from '@/hooks/services/useCompaniesFollowedByUser';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { Box } from '@/ui-elements/atoms/box';
import ConnectedBrand from './ConnectedBrand';

const ConnectedBrands = () => {
	const { response, loading, hasNextPage, onLoadMore } = useCompaniesFollowedByUser(10);
	return (
		<>
			<Box>
				<div className='px-8 py-4'>
					<p className='font-bold text-lg text-primary'>Connected Brands</p>
					<LoaderDataComponent isLoading={loading} data={response}>
						<InfiniteScroller
							loading={loading}
							scrollableTop={true}
							hasNextPage={hasNextPage}
							onLoadMore={onLoadMore}>
							{(response || []).map((recommendedBrand: CompanyEdge) => {
								const { node: brand } = recommendedBrand;
								if (brand?.id) {
									return <ConnectedBrand key={brand.id} brand={brand} />;
								}
							})}
						</InfiniteScroller>
					</LoaderDataComponent>
				</div>
			</Box>
		</>
	);
};

export default ConnectedBrands;
