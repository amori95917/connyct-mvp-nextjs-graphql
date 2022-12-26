import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ConnyctLogo } from '@/shared-components/icons';
import { ProfileDropdown } from '@/shared-components/profile-dropdown';

import { useClickOutside } from '@/hooks/useClickOutside';
import { getCookie } from '@/utils/cookies';
import { useQuery } from '@apollo/client';
import { GET_COMPANY } from '@/graphql/company';
import { useCurrentUser } from '@/hooks/services/useCurrentUserQuery';
import { Avatar } from '../avatar';

export const Navbar = () => {
	const [showDropdown, setShowDropDown] = useState(false);
	const { ref, isClose, setIsClose } = useClickOutside();
	const { currentUser } = useCurrentUser();
	const cookie = getCookie('CONNYCT_USER');
	const { company } = cookie ?? {};
	const { data } = useQuery(GET_COMPANY, {
		variables: { id: !!company ? company[0]?.id : '' },
	});

	const handleDropdown = () => {
		setShowDropDown(!showDropdown);
		setIsClose(true);
	};

	const getAvatar = () => {
		let avatar;
		let name;
		if (currentUser?.activeRole?.name === 'USER') {
			avatar = currentUser?.userProfile?.profileImage;
			name = currentUser?.username || currentUser?.fullName;
		}
		if (currentUser?.activeRole?.name === 'OWNER') {
			avatar = currentUser?.company[0]?.avatar;
			name = currentUser?.company[0].name || currentUser?.company[0].legalName;
		}
		return { avatar, name };
	};

	console.log('currentUser', currentUser);
	return (
		<div className='flex flex-col'>
			<nav className='bg-white fixed h-18 pl-5 pr-5 py-3 top-0 w-full z-10'>
				<div className='container flex items-center justify-between mx-auto'>
					<Link href='/' className='flex font-bold items-center text-primary' passHref>
						<ConnyctLogo height='2em' width='8em' />
					</Link>
					{/* <div className='search-bar'>
						<i className='uil uil-search'></i>
						<input type='search' placeholder='Search for brands' />
					</div> */}
					<div className='flex gap-8 items-center'>
						<Link href='/' passHref>
							<span>Home</span>
						</Link>
						<Link href='/my-connects' passHref>
							<span>Connects</span>
						</Link>
						<Link href='/' passHref>
							<span>Notifications</span>
						</Link>
						<button
							onClick={handleDropdown}
							className='aspect-square overflow-hidden relative rounded-full w-10'>
							<Avatar
								imgSrc={getAvatar()['avatar']}
								name={getAvatar()['name']}
								size='md'
								alt={getAvatar()['name']}
							/>
						</button>
					</div>
				</div>
			</nav>
			{showDropdown && isClose && <ProfileDropdown data={data} ref={ref} />}
		</div>
	);
};
