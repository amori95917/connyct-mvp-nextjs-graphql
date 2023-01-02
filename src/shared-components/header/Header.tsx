import Link from 'next/link';
import { useState } from 'react';

import { ConnyctLogo } from '@/shared-components/icons';

import { useCurrentUser } from '@/hooks/services/useCurrentUserQuery';
import { useClickOutside } from '@/hooks/useClickOutside';
import ConnectsIcon from '@/ui-elements/atoms/icons/ConnectsIcon';
import HomeIcon from '@/ui-elements/atoms/icons/HomeIcon';
import { Avatar } from '../avatar';
import { ProfileDropdown } from '../profile-dropdown';

const Header = () => {
	const [showDropdown, setShowDropDown] = useState(false);

	const { ref, isClose, setIsClose } = useClickOutside();
	const { currentUser } = useCurrentUser();

	const handleDropdown = () => {
		setShowDropDown(!showDropdown);
		setIsClose(true);
	};
	return (
		<div className='flex flex-col'>
			<nav className='bg-white fixed h-18 pl-5 pr-5 py-3 top-0 w-full z-10'>
				<div className='container flex items-center justify-between mx-auto'>
					<Link href='/' className='flex font-bold items-center text-primary' passHref>
						<ConnyctLogo height='2em' width='6em' />
					</Link>
					<div className='search-bar'>
						<i className='uil uil-search'></i>
						<input type='search' placeholder='Search for brands' />
					</div>
					<div className='flex gap-8 items-center'>
						<Link href='/' passHref className='flex items-center'>
							<HomeIcon />
							<span>Home</span>
						</Link>
						<Link href='/my-connects' passHref className='flex items-center'>
							<ConnectsIcon />
							<span>Connects</span>
						</Link>
						<Link href='/' passHref className='flex items-center'>
							{/* <NotificationIcon /> */}
							<span>Notifications</span>
						</Link>
						<button
							onClick={handleDropdown}
							className='aspect-square overflow-hidden relative rounded-full w-10'>
							<Avatar
								imgSrc={currentUser?.profileImage}
								name={currentUser?.username || currentUser?.fullName || ''}
								alt={currentUser?.username || currentUser?.fullName || ''}
								size='md'
							/>
						</button>
					</div>
				</div>
			</nav>
			{showDropdown && isClose && <ProfileDropdown ref={ref} currentUser={currentUser} />}
		</div>
	);
};

export default Header;
