import { useCompaniesFollowedByUser } from '@/hooks/services/useCompaniesFollowedByUser';
import { CompanyEdge } from '@/generated/graphql';
import FollowedCompany from './FollowedCompany';

export const FollowedBrand = () => {
	const { response, hasNextPage, totalCount } = useCompaniesFollowedByUser(5);

	return (
		<>
			<div className='bg-white brands p-4 rounded-small'>
				<span className='flex justify-between'>
					<p className='font-bold text-gray text-lg'>Connected Brands</p>
				</span>
				<div className='brands gap-6 grid grid-cols-4 pt-1'>
					{(response || []).map((companyEdge: CompanyEdge) => {
						const { node: company } = companyEdge;
						return <FollowedCompany key={company?.id} company={company} />;
					})}
				</div>
			</div>
		</>
	);
};
