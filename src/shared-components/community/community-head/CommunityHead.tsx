import { useCommunityQueryById } from '@/hooks/services/useCommunityQuery';
import { CommunityForm } from '@/pages/company/communities/community-form';
import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UilPen, UilLayerGroup } from '@iconscout/react-unicons';

type CommunityHeadProps = {
	coverImage: string;
	profileImage: string;
	communityName: string;
	groupStatus: string;
	members: string;
	companySlug: string | undefined;
	communitySlug: string;
};
export const CommunityHead = (props: CommunityHeadProps) => {
	const { communitySlug, profileImage, companySlug } = props;
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { loading, communityData } = useCommunityQueryById(communitySlug);
	const NavButtonClassName = 'cursor-pointer p-2 pr-6 text-center hover:bg-gray-200 rounded-md';
	const defaultNavClass = `cursor-pointer text-center p-2 pr-6 text-primary`;
	const router = useRouter();
	const navPath = router.pathname.split('/')[5];
	const { community } = communityData ?? {};

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
							<Image
								src={community?.profile ?? profileImage}
								alt='community'
								fill
								className='rounded-full'
							/>
						</div>
						<div className='flex flex-col grow px-7 py-7'>
							<div>
								<span className='font-bold text-3xl'>{community?.name}</span>
							</div>
							<div className='flex items-center'>
								<span>
									<UilLayerGroup size={20} />
								</span>
								<span className='pl-1 text-lg'>{community?.type}</span>
								<span className='pl-1 text-lg'>{community?.followersCount} members</span>
							</div>
						</div>
						<button
							className='absolute flex gap-1 items-center right-0 top-0'
							onClick={handleDrawerToggle}>
							<UilPen />
						</button>
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
				<hr className='bg-gray-100 border-0 h-px pl-10 dark:bg-gray-700' />
				{/* group navigation */}
				<div className='p-2 text-bold'>
					<div className='flex pl-10'>
						<Link href={`/company/${companySlug}/communities/${communitySlug}`} passHref>
							<span className={navPath === undefined ? defaultNavClass : NavButtonClassName}>Home</span>
						</Link>
						<Link href={`/company/${companySlug}/communities/${communitySlug}/members`} passHref>
							<span className={navPath === 'members' ? defaultNavClass : NavButtonClassName}>Members</span>
						</Link>
						<Link href={`/company/${companySlug}/communities/${communitySlug}/policy`} passHref>
							<span className={navPath === 'policy' ? defaultNavClass : NavButtonClassName}>Policy</span>
						</Link>
					</div>
				</div>
				{/* group posts */}
			</div>
		</>
	);
};
