import { Community as CommunityTypes, User } from '@/generated/graphql';
import { GET_COMMUNITIES, JOIN_PUBLIC_COMMUNITY } from '@/graphql/community';
import { Avatar } from '@/shared-components/avatar';
import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import { Button } from '@/ui-elements/atoms/button';
import { isOwner } from '@/utils/permissions';
import { useMutation } from '@apollo/client';
import { UilImageEdit } from '@iconscout/react-unicons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CommunityForm } from './community-form';
import { InviteMembers } from './invite-memers';

// Todo show proper count
const count = 0;

export const Community = ({
	community,
	companySlug,
	currentUser,
}: {
	community: CommunityTypes;
	companySlug: string;
	currentUser: User;
}) => {
	const router = useRouter();

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState(false);
	const [joinPubicCommunity, { loading }] = useMutation(JOIN_PUBLIC_COMMUNITY);

	const handleDrawerToggle = () => {
		console.log('toggled');
		setIsDrawerOpen(!isDrawerOpen);
	};
	const handleInviteDrawerToggle = () => setIsInviteDrawerOpen(!isInviteDrawerOpen);

	const onCommunityClickHandler = (communityId: string) => {
		router.push(`/brand/${companySlug}/communities/${communityId}`);
	};

	const handleCommunityJoin = async () => {
		if (community.id && community.type === 'PUBLIC') {
			await joinPubicCommunity({
				variables: {
					input: {
						communityId: community.id,
						companyId: companySlug,
					},
				},
				refetchQueries: [{ query: GET_COMMUNITIES, variables: { companyId: companySlug, first: 10 } }],
				onCompleted(data) {
					router.push(`/brand/${companySlug}/communities/${community.id}`);
				},
			});
		}
	};

	console.log('community', community);

	return (
		<>
			{isOwner(currentUser, companySlug) && isDrawerOpen && (
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} drawerSize='lg'>
					<CommunityForm setIsOpen={setIsDrawerOpen} companySlug={companySlug} community={community} />
				</RightDrawerLayout>
			)}
			{isOwner(currentUser, companySlug) && isInviteDrawerOpen && (
				<RightDrawerLayout
					isOpen={isInviteDrawerOpen}
					setIsOpen={setIsInviteDrawerOpen}
					drawerSize='2xl'>
					<InviteMembers />
				</RightDrawerLayout>
			)}
			{isOwner(currentUser, companySlug) && (
				<button
					className='absolute bg-slate-50 flex h-10 items-center justify-center right-0 rounded-full top-0 w-10 z-9'
					onClick={handleDrawerToggle}>
					<UilImageEdit />
				</button>
			)}
			<div
				onClick={() => onCommunityClickHandler(community.id as string)}
				className='cursor-pointer h-52 relative w-full'>
				<Image
					src={community?.coverImage || 'https://i.pravatar.cc'}
					fill
					alt='participant-avatar'
					className='contain rounded-md'
				/>
			</div>
			<div className='cursor-pointer flex items-center mt-5'>
				<div className='h-10 relative w-10'>
					<Avatar
						imgSrc={community?.profile}
						name={community?.name || ''}
						alt={community?.name || 'community-profile'}
						size='sm'
						className='h-16 rounded-full w-16'
					/>
				</div>

				<Link href={`/brand/${companySlug}/communities/${community.id}`}>
					<p className='cursor-pointer font-bold ml-3 text-md text-primary'>{community.name}</p>
					<p className='cursor-pointer font-bold ml-3 text-gray-400 text-md'>
						{/* WE WILL SHOW ICON FOR OPEN AND PRIVATE COMMUNITY */}
						{community?.type === 'PRIVATE' ? 'Private Community' : 'Open Community '}
						{count} members
					</p>
				</Link>
			</div>

			<div className='participants pt-2'>
				<div className='flex justify-end mt-2 whitespace-nowrap'>
					{community?.type === 'PRIVATE' && isOwner(currentUser, companySlug) && (
						<button
							className='bg-primary cursor-pointer px-2 py-2 rounded-md shadow-xl text-white'
							onClick={handleInviteDrawerToggle}>
							Invite members
						</button>
					)}
					{!isOwner(currentUser, companySlug) && !community?.isConnected && (
						<Button
							className='bg-primary cursor-pointer px-2 py-2 rounded-md shadow-xl text-white'
							loading={loading}
							onClick={handleCommunityJoin}>
							Connect
						</Button>
					)}
					{/* {[1, 2, 3].map((image, index) => (
						<Image
							key={image}
							className='h-6 inline-block ring-2 ring-white rounded-full w-6'
							width={20}
							height={20}
							src={'https://i.pravatar.cc'}
							alt={'image'}
						/>
					))} */}
				</div>
			</div>
		</>
	);
};
