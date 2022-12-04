import { useState } from 'react';

import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import PolicyForm from './PolicyForm';

type PolicyProps = {
	companySlug: string;
};

const Policy = (props: PolicyProps) => {
	const { companySlug } = props;
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);

	return (
		<>
			{isDrawerOpen && (
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
					<PolicyForm />
				</RightDrawerLayout>
			)}
			<div className=''>
				{/* TODO: use LoaderDataComponent and have below element for EmptyComponent */}
				<div className='flex flex-col mt-4 w-80'>
					<p className='text-gray-800'>
						No Rules Set Up Use rules to help set the tone for your group and help prevent member
						conflict. Write up to 10 rules about your group.
					</p>
					<button className='bg-primary px-4 py-2 text-white' onClick={handleDrawerToggle}>
						Get Started
					</button>
				</div>
			</div>
		</>
	);
};

export default Policy;
