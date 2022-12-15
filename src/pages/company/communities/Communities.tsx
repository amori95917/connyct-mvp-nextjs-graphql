import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { CommunitiesLoader } from '@/shared-components/skeleton-loader/CommunitiesLoader';
import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { useCommunityQuery } from '@/hooks/services/useCommunityQuery';
import { EmptyComponent } from '@/ui-elements/atoms/empty-component';
import { ConferenceIcon } from '@/shared-components/icons';
import { CommunityForm } from './community-form';
import { Community } from './Community';
import { CommunityEdge } from '@/generated/graphql';

const Communities = ({ companySlug }: { companySlug: string }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);
	const { communities, loading } = useCommunityQuery(companySlug);

	return (
		<>
			{isDrawerOpen && (
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
					<CommunityForm setIsOpen={setIsDrawerOpen} companySlug={companySlug} />
				</RightDrawerLayout>
			)}
			<div className='heading'>
				<div className='flex justify-between'>
					<div className='flex flex-col'>
						<h1 className='font-bold text-lg'>{communities?.[0]?.company?.legalName}</h1>
						<p className='text-gray-400'>{communities?.length} Communities</p>
					</div>
					<div className='px-5'>
						<button
							className='bg-primary flex font-bold gap-1 items-center justify-center p-4 rounded-md text-white w-full hover:bg-primary'
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
					{/** TODO improve types for community after api enhanced, this should be paginate */}
					<div className='gap-4 grid grid-cols-1 pt-4 md:grid-cols-2 lg:grid-cols-3'>
						{communities?.map((communityNode: CommunityEdge) => {
							const { node } = communityNode;
							if (node) {
								return (
									<div key={node.id} className={'bg-white p-5 rounded-lg shadow-sm'}>
										<Community community={node} companySlug={companySlug} />
									</div>
								);
							}
						})}
					</div>
				</LoaderDataComponent>
			</div>
		</>
	);
};
export default Communities;
