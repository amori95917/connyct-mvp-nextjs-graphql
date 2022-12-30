import { useState } from 'react';
import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import { useQuery } from '@apollo/client';

import { GET_BRANCH_BY_COMPANY_ID } from '@/graphql/company/resolver';
import BranchForm from './BranchForm';

const Branches = ({ companySlug }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [currentBranchData, setCurrentBranchData] = useState();

	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const { data } = useQuery(GET_BRANCH_BY_COMPANY_ID, { variables: { id: companySlug } });

	const onBranchClickHandler = branch => {
		setIsDrawerOpen(true);
		setCurrentBranchData(branch);
	};

	return (
		<>
			{
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
					<BranchForm
						companySlug={companySlug}
						isOpen={isDrawerOpen}
						setIsOpen={setIsDrawerOpen}
						currentBranch={currentBranchData}
					/>
				</RightDrawerLayout>
			}
			<div className='branches-wrapper'>
				<h1 className='font-bold text-gray-600'>Add branches</h1>
				<p className='mt-1 text-gray-400'>Add branches that exist in your company</p>
				<div className='mt-6 upload-section'>
					<div className='gap-3 grid grid-cols-3'>
						<div
							onClick={handleDrawerToggle}
							className='bg-light-bg cursor-pointer flex flex-col items-center p-10 rounded text-center w-full'
						>
							<svg
								className='h-6 mr-1 text-current-50 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
								/>
							</svg>
							<p className='mt-2 text-gray-600'>Click to add your branch information</p>
						</div>
						{data?.getBranchesByCompanyId?.branches?.map(branch => {
							return (
								<div
									key={branch.id}
									onClick={() => onBranchClickHandler(branch)}
									className='bg-white cursor-pointer flex flex-col items-center p-10 rounded shadow-md text-center'
								>
									<span>{branch?.type}</span>
									<span>{branch?.country}</span>
									<span>{branch?.city}</span>
									<span>{branch?.contactNumber}</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Branches;
