import { useCommunityQuery } from '@/hooks/services/useCommunityQuery';
import { ConferenceIcon } from '@/shared-components/icons';
import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';

import { EmptyComponent } from '@/ui-elements/atoms/empty-component';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { Community } from './Community';
import { CommunityForm } from './community-form';

import { CommunitiesLoader } from '@/shared-components/skeleton-loader/CommunitiesLoader';

const Communities = ({ companySlug }: { companySlug: string }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const router = useRouter();
	const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);
	const { communities, loading } = useCommunityQuery(companySlug);

	console.log(communities, loading, '##');

	return (
		<>
			<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
				<CommunityForm setIsOpen={setIsDrawerOpen} companySlug={companySlug} />
			</RightDrawerLayout>
			<div className='heading'>
				<div className='flex justify-between'>
					<div className='flex flex-col'>
						<h1 className='font-bold text-lg'>{`Connyct's Communities`}</h1>
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
				<LoaderDataComponent
					isLoading={loading}
					data={communities}
					fallback={<CommunitiesLoader />}
					isSuspense={true}
					emptyComponent={
						<EmptyComponent
							text='There are no communities yet'
							subText='Please create a new community'
							icon={<ConferenceIcon width='4em' height='4em' className='fill-primary' />}
						/>
					}>
					{/** TODO improve types for community api enhanced, this should be paginate */}
					<div className='gap-4 grid grid-cols-3 pt-4'>
						{communities?.map(community => {
							return (
								<div key={community.id} className={'bg-white h-72 p-5 rounded-lg shadow-sm'}>
									<Community community={community} companySlug={companySlug} />
								</div>
							);
						})}
					</div>
				</LoaderDataComponent>
			</div>
		</>
	);
};
export default Communities;
