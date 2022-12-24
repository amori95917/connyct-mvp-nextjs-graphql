import { Company } from '@/generated/graphql';
import { Avatar } from '@/shared-components/avatar';

type RecommendedBrandProps = {
	brand: Company;
	handleFollowUnfolllow: (brandId: string) => void;
	followedCompanies: Array<string>;
};
const RecommendedBrand = (props: RecommendedBrandProps) => {
	const { brand, handleFollowUnfolllow, followedCompanies } = props;
	const onFollowUnfolllow = () => {
		if (brand.id) {
			handleFollowUnfolllow(brand.id);
		}
	};
	if (brand.id) {
		const _followUnfollowBaseClass =
			'cursor-pointer flex flex-col h-10 items-center py-2 rounded-md text-white w-28 hover:font-bold hover:shadow-xl';
		const _followUnfollowClassName = followedCompanies.includes(brand.id)
			? `${_followUnfollowBaseClass} bg-brandSecondary`
			: `${_followUnfollowBaseClass} bg-primary`;
		return (
			<>
				<div className='flex items-center justify-between mt-5 w-full'>
					<div className='flex items-center w-full'>
						<div className='h-16 overflow-hidden relative rounded-full w-16'>
							<Avatar
								imgSrc={brand.avatar}
								name={brand.name || brand.legalName || ''}
								size='lg'
								alt={brand.name || brand.legalName || ''}
							/>
						</div>
						<div className='ml-5'>
							<span className='flex flex-col'>
								<span className='font-bold'> {brand.legalName}</span>
								<span className='text-slate-400'>{brand.followers || '0'} followers</span>
							</span>
						</div>
					</div>
					<div className='flex justify-end w-full'>
						<button onClick={onFollowUnfolllow} className={_followUnfollowClassName}>
							{followedCompanies.includes(brand.id) ? 'Connected' : 'Connect'}
						</button>
					</div>
				</div>
			</>
		);
	}
	return <></>;
};

export default RecommendedBrand;
