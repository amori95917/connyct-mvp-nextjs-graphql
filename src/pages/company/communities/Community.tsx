import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UilImageEdit } from '@iconscout/react-unicons';
import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import { CommunityForm } from './community-form';
import { InviteMembers } from './invite-memers';
import { Community as CommunityTypes } from '@/generated/graphql';

// Todo show proper count
const count = 0;

export const Community = ({
	community,
	companySlug,
}: {
	community: CommunityTypes;
	companySlug: string;
}) => {
	const router = useRouter();

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState(false);

	const handleDrawerToggle = () => {
		console.log('toggled');
		setIsDrawerOpen(!isDrawerOpen);
	};
	const handleInviteDrawerToggle = () => setIsInviteDrawerOpen(!isInviteDrawerOpen);

	const onCommunityClickHandler = (communityId: string) => {
		router.push(`/brand/${companySlug}/communities/${communityId}`);
	};

	return (
		<>
			{isDrawerOpen && (
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} drawerSize='lg'>
					<CommunityForm setIsOpen={setIsDrawerOpen} companySlug={companySlug} community={community} />
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
					src={community?.coverImage || 'https://i.pravatar.cc'}
					fill
					alt='participant-avatar'
					className='contain rounded-md'
				/>
			</div>
			<div className='cursor-pointer flex justify-between mt-5'>
				<Image
					src={community?.profile || 'https://i.pravatar.cc'}
					width={40}
					height={40}
					alt='participant-avatar'
					className='rounded-full'
				/>
				<button onClick={handleDrawerToggle}>
					<UilImageEdit />
				</button>
			</div>
			<Link href={`/company/${companySlug}/communities/${community.id}`}>
				<p className='cursor-pointer font-bold text-lg text-primary'>{community.name}</p>
			</Link>

			<div className='participants pt-2'>
				<div className='flex justify-end mt-2 whitespace-nowrap'>
					{community?.type === 'PRIVATE' && (
						<button
							className='bg-primary cursor-pointer px-2 py-2 rounded-md shadow-xl text-white'
							onClick={handleInviteDrawerToggle}>
							Invite members
						</button>
					)}
					<p className='grow mr-2 text-gray-600 text-right'>{count} members</p>
					{[1, 2, 3].map((image, index) => (
						<Image
							key={image}
							className='h-6 inline-block ring-2 ring-white rounded-full w-6'
							width={20}
							height={20}
							src={'https://i.pravatar.cc'}
							alt={'image'}
						/>
					))}
				</div>
			</div>
		</>
	);
};
