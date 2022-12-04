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
				<div className='flex h-screen items-center justify-center no-rules'>
					<div className='flex flex-col w-80'>
						<p className='text-gray-800'>
							No Rules Set Up Use rules to help set the tone for your group and help prevent member
							conflict. Write up to 10 rules about your group.
						</p>
						<button className='bg-primary px-4 py-2 text-white' onClick={handleDrawerToggle}>
							Get Started
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Policy;
