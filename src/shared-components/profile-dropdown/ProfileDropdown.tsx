import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {
	UilCreateDashboard,
	UilEnvelopeSend,
	UilSetting,
	UilUserSquare,
	UilSignout,
	UilEllipsisV,
	UilAngleLeft,
	UilAngleRightB,
	UilAngleUp,
	UilAngleDown,
	UilExchangeAlt,
} from '@iconscout/react-unicons';
import { useAccountSwitchMutation } from '@/hooks/services/useAccountSwitchMutation';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookies';
import { Avatar } from '../avatar';

export const ProfileDropdown = React.forwardRef(({ data, currentUser }, ref) => {
	const { switchAccount, data: switchAccountData } = useAccountSwitchMutation();
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

	// const buttonClass =
	// 	'bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-72 w-full active:bg-brandSecondary';

	const handleAccountSwitch = async (accountType: string) => {
		if (user?.id) {
			await switchAccount({
				variables: {
					input: {
						userId: user.id,
						accountType,
					},
				},
			});
			if (switchAccountData?.switchAccount) {
				setCookie('CONNYCT_USER', switchAccountData?.switchAccount);
				Router.push('/feeds');
			}
		}
	};

	return (
		<div className='container mx-auto relative z-10'>
			{/* <div className='arrow-up fixed right-3 right-8 top-14 z-20'></div> */}
			<div
				ref={ref}
				className={`bg-gray-50 fixed flex ${classes.mainHeight} duration-200 ease-in-out  no-scrollbar  overflow-y-auto p-3 right-5 rounded-md shadow-lg top-16 w-80`}>
				<div className={`ml-1 ${classes.main} absolute w-72`}>
					<div className='bg-primary flex flex-col items-center rounded-md shadow-sm'>
						<div className='mt-5'>
							<Avatar
								imgSrc={data?.getCompanyById?.avatar || currentUser?.company[0]?.avatar}
								name={currentUser?.company[0]?.name || currentUser?.company[0]?.legalName}
								alt={currentUser?.company[0]?.legalName || 'brand-avatar'}
							/>
						</div>
						<div
							className='bg-brandSecondary cursor-pointer mt-4 py-3 w-full'
							onClick={() => handleAccountSwitch('USER')}>
							<div className='flex justify-between'>
								<div className='flex gap-2 items-center pl-4'>
									<Avatar
										imgSrc={currentUser?.profileImage}
										name={currentUser?.username || currentUser?.fullName}
										alt={currentUser?.username || currentUser?.fullName || 'user-avatar'}
										size='sm'
									/>
									<p className='font-semibold text-center text-md text-white'>
										{currentUser ? currentUser?.username : currentUser.fullName}
									</p>
								</div>
								<UilExchangeAlt fill='white' size={32} className='mr-4' />
							</div>
						</div>
					</div>
					<Link href={`/dashboard`} passHref>
						<button className='bg-slate-100 flex mt-2 p-3 rounded-md text-left w-full active:bg-brandSecondary'>
							<UilCreateDashboard size={25} className='fill-primary' />
							<span className='ml-5'>Dashboard</span>
						</button>
					</Link>
					<button className='bg-slate-100 flex mt-2 p-3 rounded-md text-left w-full active:bg-brandSecondary'>
						<UilEnvelopeSend size={25} className='fill-primary' />
						<span className='ml-5'>Invite</span>
					</button>
					<button
						onClick={() => onClickHandler('setting')}
						className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-full active:bg-brandSecondary'>
						<span className='flex'>
							<UilSetting size={25} className='fill-primary' />
							<span className='ml-5'>Settings</span>
						</span>
						<span className='text-2xl'>
							<UilAngleRightB />
						</span>
					</button>
					<button
						onClick={() => onClickHandler('manage')}
						className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-full active:bg-brandSecondary'>
						<span className='flex'>
							<UilUserSquare size={25} className='fill-primary' />
							<span className='ml-5'>Manage</span>
						</span>
						<span className='text-2xl'>
							<UilAngleRightB />
						</span>
					</button>
					<button
						onClick={() => onClickHandler('other')}
						className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-full active:bg-brandSecondary'>
						<span className='flex'>
							<UilEllipsisV rotate={'-180deg'} size={25} className='fill-primary' />
							<span className='ml-5'>Other</span>
						</span>
						<span className='text-2xl'>
							<UilAngleRightB />
						</span>
					</button>
					<button
						onClick={onClickLogoutHandle}
						className='bg-slate-100 flex mt-2 p-3 rounded-md text-left w-full active:bg-brandSecondary'>
						<UilSignout size={25} className='fill-primary' />
						<span className='ml-5'>Logout</span>
					</button>
				</div>
				<div className={` ${classes.setting} absolute duration-200 ease-in-out  ml-5`}>
					<span className='flex items-center ml-5'>
						<button onClick={onBackClick}>
							<UilAngleLeft size={25} />
						</button>{' '}
						<span className='bold ml-5 text-2xl'>Settings</span>
					</span>
					<button className='bg-slate-100 flex items-center justify-between mt-3 p-3 rounded-md text-left w-full active:bg-brandSecondary'>
						<span className='flex'>
							<UilSetting size={25} className='fill-primary' />
							<span className='ml-5'>Settings</span>
						</span>
						<span className='text-2xl'>
							<UilAngleRightB />
						</span>
					</button>
				</div>
				<div className={` ${classes.manage} absolute duration-200 ease-in-out ml-5`}>
					<span className='flex items-center ml-5'>
						<button onClick={onBackClick}>
							<UilAngleLeft size={25} />
						</button>{' '}
						<span className='bold ml-5 text-2xl'>Manage</span>
					</span>
					<button className='bg-slate-100 flex items-center justify-between mt-3 p-3 rounded-md text-left w-full active:bg-brandSecondary'>
						<Link href={`/brand/${slug}/edit/business-information/general`} passHref>
							<button className='flex'>
								<UilSetting size={25} className='fill-primary' />
								<span className='ml-5'>Edit Brand Profile</span>
							</button>
						</Link>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-3 p-3 rounded-md text-left w-full active:bg-brandSecondary'>
						<Link href={`/user/profile`} passHref>
							<button className='flex'>
								<UilSetting size={25} className='fill-primary' />
								<span className='ml-5'>Edit Personal Profile</span>
							</button>
						</Link>
					</button>
					<button className='bg-slate-100 flex items-center justify-between mt-2 p-3 rounded-md text-left w-full active:bg-brandSecondary'>
						<span className='flex'>
							<UilSetting size={25} className='fill-primary' />
							<span className='ml-5'>Manage</span>
						</span>
						<span className='text-2xl'>
							<UilAngleRightB />
						</span>
					</button>
				</div>
				<div className={` ${classes.other} absolute duration-200 ease-in-out  ml-5`}>
					<span className='flex items-center ml-5'>
						<button onClick={onBackClick}>
							<UilAngleLeft size={25} />
						</button>{' '}
						<span className='bold ml-5 text-2xl'>Other</span>
					</span>
					<button className='bg-slate-100 flex items-center justify-between mt-3 p-3 rounded-md text-left w-full active:bg-brandSecondary'>
						<span className='flex'>
							<UilSetting size={25} className='fill-primary' />
							<span className='ml-5'>Other</span>
						</span>
					</button>
				</div>
			</div>
		</div>
	);
});

ProfileDropdown.displayName = 'ProfileDropdown';
