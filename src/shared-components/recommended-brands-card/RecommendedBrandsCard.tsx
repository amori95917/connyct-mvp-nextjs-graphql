import { CompanyEdge } from '@/generated/graphql';
import { useRecommendedCompanies } from '@/hooks/services/useRecommendedCompanies';
import { Avatar } from '../avatar';

const RecommendedBrandsCard = () => {
	const { response, loading } = useRecommendedCompanies(5);
	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<>
			{response.map((data: CompanyEdge) => {
				const { node } = data;
				if (node) {
					return (
						<div key={node.id} className='flex items-center mt-3'>
							<div className='flex h-10 w-10'>
								<Avatar
									className='rounded-full'
									size='sm'
									imgSrc={node.avatar}
									name={node.legalName || node.name || ''}
									alt={node.legalName || 'brand-avatar'}
								/>
							</div>
							<span className='flex flex-col ml-2'>
								<span className='font-bold text-md'>{node.name || node.legalName}</span>
								<span className='flex text-slate-500 text-sm'>{node.followers || 0} Followers</span>
							</span>
						</div>
					);
				}
			})}
		</>
	);
};

export default RecommendedBrandsCard;
