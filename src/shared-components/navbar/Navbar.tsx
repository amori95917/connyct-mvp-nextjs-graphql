import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ConnyctLogo } from '@/shared-components/icons';
import { ProfileDropdown } from '@/shared-components/profile-dropdown';

import { useClickOutside } from '@/hooks/useClickOutside';
import { getCookie } from '@/utils/cookies';
import { useQuery } from '@apollo/client';
import { GET_COMPANY } from '@/graphql/company';

export const Navbar = () => {
	const [showDropdown, setShowDropDown] = useState(false);
	const { ref, isClose, setIsClose } = useClickOutside();
	const cookie = getCookie('CONNYCT_USER');
	const { company } = cookie ?? {};
	const { data } = useQuery(GET_COMPANY, {
		variables: { id: !!company ? company[0]?.id : '' },
	});

	const handleDropdown = () => {
		setShowDropDown(!showDropdown);
		setIsClose(true);
	};
	return (
		<div className='flex flex-col'>
			<nav className='bg-white fixed h-18 pl-5 pr-5 py-3 top-0 w-full z-10'>
				<div className='container flex items-center justify-between mx-auto'>
					<Link href='/' className='flex font-bold items-center text-primary' passHref>
						<ConnyctLogo height='2em' width='2em' />
						<span className='pl-1 text-lg'>connyct</span>
					</Link>
					{/* <div className='search-bar'>
						<i className='uil uil-search'></i>
						<input type='search' placeholder='Search for brands' />
					</div> */}
					<div className='flex gap-8 items-center'>
						<Link href='/' passHref>
							<span>Home</span>
						</Link>
						<Link href='/myconnect' passHref>
							<span>Connects</span>
						</Link>
						<Link href='/' passHref>
							<span>Notifications</span>
						</Link>
						<button
							onClick={handleDropdown}
							className='aspect-square overflow-hidden relative rounded-full w-10'>
							<Image src='https://i.pravatar.cc/300' alt='profile-photo' width='40' height='40' />
						</button>
					</div>
				</div>
			</nav>
			{showDropdown && isClose && <ProfileDropdown data={data} ref={ref} />}
		</div>
	);
};
