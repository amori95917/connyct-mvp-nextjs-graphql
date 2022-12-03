import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AiOutlinePlus } from 'react-icons/ai';

import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import { useCommunityQuery } from '@/hooks/services/useCommunityQuery';
import { CommunityForm } from './community-form';

const Communities = ({ companySlug }: { companySlug: string }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);
	const { communities, loading } = useCommunityQuery(companySlug);

	console.log(companySlug, communities, 'communities');
	return (
		<>
			{
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
					<CommunityForm setIsOpen={setIsDrawerOpen} companySlug={companySlug} />
				</RightDrawerLayout>
			}
			<div className='heading'>
				<div className='flex justify-between'>
					<div className='flex flex-col'>
						<h1 className='font-bold text-lg'>Connyct's Communities</h1>
						<p className='text-gray-400'>2 communities created</p>
					</div>
					<div className='px-5'>
						<button
							className='bg-primaryv2 flex font-bold gap-1 items-center justify-center p-4 rounded-md text-white w-full hover:bg-primary'
							onClick={handleDrawerToggle}>
							<AiOutlinePlus fill='#FFFFFF' size={20} />
							<span>Create a new community</span>
						</button>
					</div>
				</div>
				<div className='gap-4 grid grid-cols-3 pt-4'>
					{communities?.map(community => (
						<div key={community.id} className='bg-white p-5 rounded-lg shadow-sm'>
							<div className='h-full relative w-full'>
								<Image
									src='https://i.pravatar.cc'
									fill
									objectFit='contain'
									alt='participant-avatar'
									className='contain rounded-md'
								/>
							</div>
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
