import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Community = ({ community, companySlug }: { companySlug: string }) => {
	const router = useRouter();

	const onCommunityClickHandler = (communityId: string) => {
		router.push(`/company/${companySlug}/communities/${communityId}`);
	};
	return (
		<>
			<div
				onClick={() => onCommunityClickHandler(community.id)}
				className='cursor-pointer h-2/3 relative w-full'>
				<Image
					src={community?.profile || ''}
					fill
					objectFit='cover'
					alt='participant-avatar'
					className='contain rounded-md'
				/>
			</div>
			<Link href={`/company/${companySlug}/communities/${community.id}`}>
				<p className='cursor-pointer font-bold text-center text-lg text-primary'>{community.name}</p>
			</Link>
			<div className='participants pt-2'>
				<div className='flex items-center justify-center'>
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
					{community?.type === 'PRIVATE' && (
						<button className='bg-white cursor-pointer ml-2 px-2 rounded-md shadow-xl'>Invite</button>
					)}
				</div>
				<p className='pt-2 text-center text-gray-600'>32 participants</p>
			</div>
		</>
	);
};
