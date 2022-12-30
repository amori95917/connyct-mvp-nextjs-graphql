import { CompanyEdge } from '@/generated/graphql';
import { useRecommendedCompanies } from '@/hooks/services/useRecommendedCompanies';
import useCompanySuggestion from '@/pages/company-suggestions/hooks';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { Box } from '@/ui-elements/atoms/box';
import RecommendedBrand from './RecommendedBrand';

const RecommendedBrands = () => {
	const { onFollow, onUnfollow, followedCompanies, followLoading, unfollowLoading } =
		useCompanySuggestion();
	const { response, loading, hasNextPage, onLoadMore } = useRecommendedCompanies(10);
	const handleFollowUnfolllow = (brandId: string) => {
		if (followedCompanies.includes(brandId)) {
			// this means user is already connected so further click will unfollow brand
			onUnfollow(brandId);
		} else {
			onFollow(brandId);
		}
	};
	return (
		<>
			<Box>
				<div className='px-8 py-4'>
					<p className='font-bold text-lg text-primary'>Recommended Brands</p>
					<LoaderDataComponent isLoading={loading} data={response}>
						<InfiniteScroller
							loading={loading}
							scrollableTop={true}
							hasNextPage={hasNextPage}
							onLoadMore={onLoadMore}
						>
							{(response || []).map((recommendedBrand: CompanyEdge) => {
								const { node: brand } = recommendedBrand;
								if (brand?.id) {
									return (
										<RecommendedBrand
											key={brand.id}
											brand={brand}
											handleFollowUnfolllow={handleFollowUnfolllow}
											followedCompanies={followedCompanies}
											followLoading={followLoading}
											unfollowLoading={unfollowLoading}
										/>
									);
								}
							})}
						</InfiniteScroller>
					</LoaderDataComponent>
				</div>
			</Box>
		</>
	);
};

export default RecommendedBrands;
