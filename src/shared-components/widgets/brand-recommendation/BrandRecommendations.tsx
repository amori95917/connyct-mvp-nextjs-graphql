import { CompanyEdge } from '@/generated/graphql';
import { useRecommendedCompanies } from '@/hooks/services/useRecommendedCompanies';
import useCompanySuggestion from '@/pages/company-suggestions/hooks';
import RecommendedBrand from './RecommendedBrand';

type BrandRecommendationProps = {
	first: number;
};

const BrandRecommendation = (props: BrandRecommendationProps) => {
	const { first = 4 } = props;
	const { response, loading } = useRecommendedCompanies(first);
	const { onFollow, onUnfollow, followedCompanies } = useCompanySuggestion();
	const handleFollowUnfolllow = (brandId: string) => {
		console.log(brandId);
		if (followedCompanies.includes(brandId)) {
			// this means user is already connected so further click will unfollow brand
			onUnfollow(brandId);
		} else {
			onFollow(brandId);
		}
	};
	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<>
			{(response || []).map((recommendedBrand: CompanyEdge) => {
				const { node: brand } = recommendedBrand;
				if (brand?.id) {
					return (
						<RecommendedBrand
							key={brand.id}
							brand={brand}
							handleFollowUnfolllow={handleFollowUnfolllow}
							followedCompanies={followedCompanies}
						/>
					);
				}
			})}
		</>
	);
};

export default BrandRecommendation;
