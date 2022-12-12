import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { Contributor } from '@/shared-components/contributor';
import { RightDrawerLayout } from '../right-drawer-layout';

const Contributors = [
	{
		id: 1,
		imageSrc: 'https://i.pravatar.cc/500',
		name: 'Kiran Budhathoki',
		replies: 102,
	},
	{
		id: 2,
		imageSrc: 'https://i.pravatar.cc/500',
		name: 'Kiran Budhathoki',
		replies: 102,
	},
	{
		id: 3,
		imageSrc: 'https://i.pravatar.cc/500',
		name: 'Kiran Budhathoki',
		replies: 102,
	},
	{
		id: 4,
		imageSrc: 'https://i.pravatar.cc/500',
		name: 'Kiran Budhathoki',
		replies: 102,
	},
];

export const DiscussionLayout = ({
	companySlug,
	children,
	DiscussionForm,
}: {
	companySlug: string;
	children: React.ReactNode;
	DiscussionForm: any;
}) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const router = useRouter();
	const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);

	const onClickHandler = () => {
		router.push(`/company/${companySlug}/discussions`);
	};

	// TODO we get user and comment associated with this we need to redirect accordingly

	const onContributorClickHandler = () => {
		router.push(`/company/${companySlug}/discussions`);
	};
	return (
		<>
			<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
				<DiscussionForm companySlug={companySlug} setIsOpen={setIsDrawerOpen} />
			</RightDrawerLayout>
			<div className='flex'>
				<div className='flex flex-col w-4/5'>
					{/* discussion */}
					<span onClick={onClickHandler} className='cursor-pointer font-bold mb-6 text-xl'>
						Discussions
					</span>
					<div className='flex flex-col gap-3'>{children}</div>
				</div>
				<div className='flex flex-col'>
					<div className='px-5 w-full'>
						<button
							className='bg-primary flex font-bold gap-1 items-center justify-center p-4 rounded-md text-white w-full hover:bg-primary'
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
								{Contributors.map((contributor, index) => {
									const { id, name, imageSrc, replies } = contributor;
									return (
										<div key={id} onClick={onContributorClickHandler}>
											<Contributor imgSrc={imageSrc} name={name} replies={replies} />
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
