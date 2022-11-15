import React, { useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
// import { useQuery } from '@apollo/client';
import { MdOutlineSettings } from 'react-icons/md';
import { FcInvite } from 'react-icons/fc';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { BiLogOutCircle } from 'react-icons/bi';
import { MdOutlineMore } from 'react-icons/md';
import { AiOutlineArrowLeft } from 'react-icons/ai';

// import { GET_USER } from '@/graphql/user';
import { deleteCookie, getCookie } from '@/utils/cookies';

export const ProfileDropdown = React.forwardRef(({ data }, ref) => {
	const { company, user } = getCookie('CONNYCT_USER');

	const slug = data?.getCompanyById?.id;

	const [classes, setClasses] = useState({
		main: '',
		mainHeight: 'h-127',
		setting: '-right-72',
		manage: '-right-72',
		other: '-right-72',
	});

	const onClickLogoutHandle = () => {
		Router.push('/account/login');
		deleteCookie('CONNYCT_USER');
	};

	const onBackClick = () => {
		setClasses({
			main: '',
			setting: '-right-72',
			manage: '-right-72',
			other: '-right-72',
			mainHeight: 'h-127',
		});
	};

	const onClickHandler = (name: string) => {
		if (name === 'setting') {
			setClasses({
				main: '-left-72',
				setting: 'right-5',
				manage: '-right-72',
				other: '-right-72',
				mainHeight: 'h-129',
			});
		} else if (name === 'manage') {
			setClasses({
				main: '-left-72',
				setting: '-right-72',
				manage: 'right-5',
				other: '-right-72',
				mainHeight: 'h-52',
			});
		} else if (name === 'other') {
			setClasses({
				main: '-left-72',
				setting: '-right-72',
				manage: '-right-72',
				other: 'right-5',
				mainHeight: 'h-96',
			});
		}
	};

	const buttonClass =
		'bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300';

	return (
		<div className='container mx-auto relative z-10'>
			{/* <div className='arrow-up fixed right-3 right-8 top-14 z-20'></div> */}
			<div
				ref={ref}
				className={`bg-gray-50 fixed flex ${classes.mainHeight} duration-200 ease-in-out  no-scrollbar  overflow-hidden p-3 right-5 rounded-md shadow-lg top-16 w-80`}>
				<div className={`ml-1 ${classes.main} absolute w-72`}>
					<div className='bg-primary flex flex-col h-32 items-center rounded-md shadow-sm'>
						<span className='mt-5'>
							<Image
								src='https://i.pravatar.cc/300'
								alt='profile-photo'
								width={60}
								height={60}
								className={'rounded-full'}
							/>
						</span>
						<span className='font-semibold text-white text-xl'>
							{company ? company[0]?.legalName : user.email}
						</span>
					</div>
					<button className='bg-slate-100 flex mt-2 p-3 rounded-md text-left w-full active:bg-indigo-300'>
						<FcInvite size={25} fill='#00E0FF' />
						<span className='ml-5'>Invite</span>
					</button>
					<button
						onClick={() => onClickHandler('setting')}
						className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Settings</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button
						onClick={() => onClickHandler('manage')}
						className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineManageAccounts size={25} fill='#00E0FF' />
							<span className='ml-5'>Manage</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button
						onClick={() => onClickHandler('other')}
						className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineMore rotate={'-180deg'} size={25} fill='#00E0FF' />
							<span className='ml-5'>Other</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button
						onClick={onClickLogoutHandle}
						className='bg-slate-100 flex mt-2 p-3 rounded-md text-left w-full active:bg-indigo-300'>
						<BiLogOutCircle size={25} fill='#00E0FF' />
						<span className='ml-5'>Logout</span>
					</button>
				</div>
				<div className={` ${classes.setting} absolute duration-200 ease-in-out  ml-5`}>
					<span className='flex items-center ml-5'>
						<button onClick={onBackClick}>
							<AiOutlineArrowLeft size={25} />
						</button>{' '}
						<span className='bold ml-5 text-2xl'>Settings</span>
					</span>
					<button className='bg-slate-100 flex items-center justify-between mt-3 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Settings</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Settings</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Settings</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Settings</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Settings</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Settings</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Settings</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
				</div>
				<div className={` ${classes.manage} absolute duration-200 ease-in-out ml-5`}>
					<span className='flex items-center ml-5'>
						<button onClick={onBackClick}>
							<AiOutlineArrowLeft size={25} />
						</button>{' '}
						<span className='bold ml-5 text-2xl'>Manage</span>
					</span>
					<button className='bg-slate-100 flex items-center justify-between mt-3 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<Link href={`/company/${slug}/edit/business-information/general`} passHref>
							<button className='flex'>
								<MdOutlineSettings size={25} fill='#00E0FF' />
								<span className='ml-5'>Edit Profile</span>
							</button>
						</Link>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Manage</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Manage</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
				</div>
				<div className={` ${classes.other} absolute duration-200 ease-in-out  ml-5`}>
					<span className='flex items-center ml-5'>
						<button onClick={onBackClick}>
							<AiOutlineArrowLeft size={25} />
						</button>{' '}
						<span className='bold ml-5 text-2xl'>Other</span>
					</span>
					<button className='bg-slate-100 flex items-center justify-between mt-3 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Other</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Other</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-indigo-300'>
						<span className='flex'>
							<MdOutlineSettings size={25} fill='#00E0FF' />
							<span className='ml-5'>Other</span>
						</span>
						<span className='text-2xl'>{'>'}</span>
					</button>
				</div>
			</div>
		</div>
	);
});

ProfileDropdown.displayName = 'ProfileDropdown';
