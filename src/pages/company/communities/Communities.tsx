import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import { CommunityForm } from './community-form';

const COMMUNITIES = [
	{
		id: 1,
		name: 'Connycters',
		totalParticipants: '10k',
	},
	{
		id: 2,
		name: 'Group for change',
		totalParticipants: '20k',
	},
];
const Communities = ({ companySlug }: { companySlug: string }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);
	return (
		<>
			{
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
					<CommunityForm />
				</RightDrawerLayout>
			}
			<div className='heading'>
				<div className='flex justify-between'>
					<div className='flex flex-col'>
						<h1 className='font-bold text-lg'>Connyct's Communities</h1>
						<p className='text-gray-400'>2 communities created</p>
					</div>
					<div className='action' onClick={handleDrawerToggle}>
						<button className='bg-primary px-10 py-2 text-lg text-white'>Create a new community</button>
					</div>
				</div>
				<div className='gap-4 grid grid-cols-3 pt-4'>
					{COMMUNITIES.map(community => (
						<div key={community.id} className='bg-white p-5 rounded-lg shadow-sm'>
							<Link href={`/company/${companySlug}/communities/${community.id}`}>
								<p className='cursor-pointer font-bold text-center text-lg text-primary'>
									{community.name}
								</p>
							</Link>
							<div className='participants pt-4'>
								<div className='flex items-center justify-center'>
									{[1, 2, 3, 4].map((image, index) => (
										<div key={index}>
											<Image
												src='https://i.pravatar.cc'
												width={20}
												height={20}
												alt='participant-avatar'
												className='rounded-full'
											/>
										</div>
									))}
								</div>
								<p className='pt-5 text-center text-gray-600'>32 participants</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Communities;
