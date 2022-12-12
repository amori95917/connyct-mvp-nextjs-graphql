import { useState } from 'react';

import { CommunityPolicy } from '@/generated/graphql';
import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import PolicyForm from '../PolicyForm';
import { pick } from '@/utils/array';

type PolicyProps = {
	data: CommunityPolicy;
	communitySlug: String;
};
const Policy = (props: PolicyProps) => {
	const { data, communitySlug } = props;
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);
	const onDrawerClose = () => setIsDrawerOpen(false);
	const handlePolicyDelete = () => {
		// show popup to confirm if user sure want to delete? If yes then call deleteCommunityPolicy mutation
	};
	return (
		<>
			{isDrawerOpen && (
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} drawerSize='md'>
					<PolicyForm
						communitySlug={communitySlug}
						onClose={onDrawerClose}
						defaultValue={pick(data, ['id', 'title', 'description'])}
					/>
				</RightDrawerLayout>
			)}
			<div className='bg-white box mb-10 shadow-sm'>
				<div className='bg-gray-100 p-4'>
					<div className='flex space-between'>
						<p className='flex-1 font-bold'>{data.title}</p>
						<div className='flex'>
							<p className='cursor-pointer font-bold mr-4' onClick={handleDrawerToggle}>
								Edit
							</p>
							<p className='cursor-pointer font-bold' onClick={handlePolicyDelete}>
								Delete
							</p>
						</div>
					</div>
				</div>
				<div className='content p-4'>
					<p>{data.description}</p>
				</div>
			</div>
		</>
	);
};

export default Policy;
