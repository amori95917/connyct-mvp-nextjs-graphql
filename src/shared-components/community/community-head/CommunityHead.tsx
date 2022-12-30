import { UilLayerGroup, UilPen } from '@iconscout/react-unicons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Community, User } from '@/generated/graphql';
import { CommunityForm } from '@/pages/company/communities/community-form';
import { Avatar } from '@/shared-components/avatar';
import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import { isOwner } from '@/utils/permissions';

type CommunityHeadProps = {
	companySlug: string | undefined;
	communitySlug: string;
	authorizedUser: User;
	community: Community;
};

const NavButtonClassName = 'cursor-pointer p-2 pr-6 text-center hover:bg-gray-200 rounded-md';
const defaultNavClass = `cursor-pointer text-center p-2 pr-6 text-primary`;

export const CommunityHead = (props: CommunityHeadProps) => {
	const { communitySlug, companySlug, authorizedUser, community } = props;
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const router = useRouter();
	const navPath = router.pathname.split('/')[5];

	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<>
			<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} drawerSize='2xl'>
				<CommunityForm
					isEditing={true}
					setIsOpen={setIsDrawerOpen}
					companySlug={companySlug}
					communityId={communitySlug}
				/>
			</RightDrawerLayout>
			<div className='bg-white flex flex-col rounded-md w-full'>
				<div className='p-5'>
					<div className='bg-white flex items-center pl-10 relative w-full'>
						<div className='border-4 border-solid border-white h-20 relative rounded-full w-20'>
							<Avatar
								imgSrc={community?.profile}
								name={community?.name}
								alt={community?.name || 'community'}
								className='rounded-full'
							/>
						</div>
						<div className='flex flex-col grow pb-6 pt-2 px-7'>
							<div>
								<span className='font-bold text-3xl'>{community?.name}</span>
							</div>
							<div className='flex items-center'>
								<span>
									<UilLayerGroup size={20} />
								</span>
								<span className='pl-1 text-lg'>{community?.type}</span>
								<span className='pl-4 text-lg'>{community?.followersCount} members</span>
							</div>
						</div>
						{isOwner(authorizedUser, companySlug) && (
							<button
								className='absolute flex gap-1 items-center right-0 top-0'
								onClick={handleDrawerToggle}
							>
								<UilPen />
							</button>
						)}
						<div className='relative'>
							<div className='flex flex-col relative top-7'>
								<button className='bg-primary font-bold p-2 px-6 rounded-md text-lg text-white'>
									Join Community
								</button>
								{/* invite button */}
								{/* <button className='bg-primary font-bold ml-2 p-2 px-6 rounded-md text-lg text-white'>
									Invite
								</button> */}
							</div>
						</div>
					</div>
				</div>
				<hr className='bg-slate-100 border-0 h-px pl-10 dark:bg-slate-200' />
				{/* group navigation */}
				<div className='p-2 text-bold'>
					<div className='flex pl-10'>
						<Link href={`/brand/${companySlug}/communities/${communitySlug}`} passHref>
							<span className={navPath === undefined ? defaultNavClass : NavButtonClassName}>Home</span>
						</Link>
						<Link href={`/brand/${companySlug}/communities/${communitySlug}/members`} passHref>
							<span className={navPath === 'members' ? defaultNavClass : NavButtonClassName}>Members</span>
						</Link>
						<Link href={`/brand/${companySlug}/communities/${communitySlug}/policy`} passHref>
							<span className={navPath === 'policy' ? defaultNavClass : NavButtonClassName}>Policy</span>
						</Link>
					</div>
				</div>
				{/* group posts */}
			</div>
		</>
	);
};
