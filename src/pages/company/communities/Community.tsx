import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiEdit2 } from 'react-icons/fi';
import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import { CommunityForm } from './community-form';
import { InviteMembers } from './invite-memers';

export const Community = ({ community, companySlug }: { companySlug: string }) => {
	const router = useRouter();

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState(false);

	const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);
	const handleInviteDrawerToggle = () => setIsInviteDrawerOpen(!isInviteDrawerOpen);

	const onCommunityClickHandler = (communityId: string) => {
		router.push(`/company/${companySlug}/communities/${communityId}`);
	};
	return (
		<>
			{isDrawerOpen && (
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} drawerSize='2xl'>
					<CommunityForm isEditing={true} setIsOpen={setIsDrawerOpen} companySlug={companySlug} />
				</RightDrawerLayout>
			)}
			{isInviteDrawerOpen && (
				<RightDrawerLayout
					isOpen={isInviteDrawerOpen}
					setIsOpen={setIsInviteDrawerOpen}
					drawerSize='2xl'>
					<InviteMembers />
				</RightDrawerLayout>
			)}
			<div
				onClick={() => onCommunityClickHandler(community.id)}
				className='cursor-pointer h-52 relative w-full'>
				<Image
					src={community?.profile || ''}
					fill
					alt='participant-avatar'
					className='contain rounded-md'
				/>
			</div>
			<div className='cursor-pointer flex justify-between mt-5'>
				<Image
					src='https://i.pravatar.cc'
					width={40}
					height={40}
					alt='participant-avatar'
					className='rounded-full'
				/>
				<button onClick={handleDrawerToggle}>
					<FiEdit2 />
				</button>
			</div>
			<Link href={`/company/${companySlug}/communities/${community.id}`}>
				<p className='cursor-pointer font-bold text-lg text-primary'>{community.name}</p>
			</Link>
			{/* <p>{community.description}</p> */}

			<div className='participants pt-2'>
				<div className='flex justify-end mt-2'>
					{community?.type === 'PRIVATE' && (
						<button
							className='bg-primary cursor-pointer px-2 py-2 rounded-md shadow-xl text-white'
							onClick={handleInviteDrawerToggle}>
							Invite members
						</button>
					)}
					<p className='grow mr-2 text-gray-600 text-right'>32 member</p>
					{[1, 2, 3, 4].map((image, index) => (
						<div className='cursor-pointer' key={index}>
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
			</div>
		</>
	);
};
