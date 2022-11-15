import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { Contributor } from '@/shared-components/contributor';
import { ConferenceIcon } from '@/shared-components/icons';
import { EmptyComponent } from '@/ui-elements/atoms/empty-component';
import Discussion from './Discussion';
import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import { DiscussionForm } from './discussion-form';

const discussions: any = [
	{
		id: 1,
		title: 'Discussion title would be here but recommended to have short title',
		vote: 10,
		description: 'Long description',
		comments: [{ id: 1, text: 'comment text' }],
	},
	{
		id: 2,
		title: 'Discussion title',
		vote: 1,
		description: 'Long description',
		comments: [{ id: 1, text: 'comment text' }],
	},
	{
		id: 3,
		title: 'Discussion title',
		vote: 100,
		description: 'Long description',
		comments: [{ id: 1, text: 'comment text' }],
	},
	{
		id: 4,
		title: 'Discussion title',
		vote: 100,
		description: 'Long description',
		comments: [{ id: 1, text: 'comment text' }],
	},
];

const Discussions = ({ companySlug }: { companySlug: string }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);
	return (
		<>
			{
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
					<DiscussionForm />
				</RightDrawerLayout>
			}
			<div className='flex'>
				<div className='flex flex-col w-4/5'>
					{/* discussion */}
					<span className='font-bold mb-6 text-xl'>Discussions</span>
					<div className='flex flex-col gap-3'>
						<LoaderDataComponent
							isLoading={false}
							data={discussions}
							emptyComponent={
								<EmptyComponent
									text='There are no discussion yet'
									subText='Please create a new discussion'
									icon={<ConferenceIcon width='4em' height='4em' />}
								/>
							}>
							{discussions.map(discussion => (
								<>
									<Discussion key={discussion.id} discussion={discussion} companySlug={companySlug} />
								</>
							))}
						</LoaderDataComponent>
					</div>
				</div>
				<div className='flex flex-col'>
					<div className='px-5 w-full'>
						<button
							className='bg-primaryv2 flex font-bold gap-1 items-center justify-center p-4 rounded-md text-white w-full hover:bg-primary'
							onClick={handleDrawerToggle}>
							<AiOutlinePlus fill='#FFFFFF' size={20} />
							<span>Start a New Topic</span>
						</button>
					</div>
					<div className='p-5'>
						<div className='bg-white p-5 rounded-md'>
							<div className=''>
								<span className='font-bold text-lg'>Top Streaks</span>
								<div>
									<span className='cursor-pointer text-gray-400 text-sm'>
										People who started the most discussion on Talks
									</span>
								</div>
								<hr className='bg-gray-200 border-0 h-px mb-4 pl-10 dark:bg-gray-700' />
							</div>
							<div className='flex flex-col gap-3'>
								<Contributor imgSrc='https://i.pravatar.cc/500' name='Kiran Budhathoki' replies={102} />
								<Contributor imgSrc='https://i.pravatar.cc/100' name='Ram Prasad' replies={75} />
								<Contributor imgSrc='https://i.pravatar.cc/200' name='Karan Singh' replies={702} />
								<Contributor imgSrc='https://i.pravatar.cc/300' name='Hari' replies={402} />
								<Contributor imgSrc='https://i.pravatar.cc/400' name='Shyam' replies={302} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Discussions;
