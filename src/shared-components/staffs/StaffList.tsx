import { User } from '@/generated/graphql';
import { isOwner } from '@/utils/permissions';
import { useState } from 'react';
import MessageWidget from '../message-widget/MessageWidget';
import Staff from './Staff';

type StaffListProps = {
	companySlug: string;
	authorizedUser: User;
};

const StaffList = (props: StaffListProps) => {
	const { companySlug, authorizedUser } = props;

	return (
		<>
			{isOwner(authorizedUser, companySlug) && (
				<button className='bg-primary px-4 py-2 rounded text-white'>Add new staff</button>
			)}
			<p className='cursor-pointer font-bold mb-6 text-primary text-xl'>Staffs</p>
			<div className='bg-white p-4 rounded-md'>
				{STAFFS.map(staff => (
					<Staff key={staff.id} item={staff} />
				))}
			</div>
		</>
	);
};

export default StaffList;

const STAFFS = [
	{ id: 1, fullName: 'Kiran Budathoki', username: 'kiran', role: 'MANAGER' },
	{ id: 2, fullName: 'Joseff Regmi', username: 'joseff', role: 'EDITOR' },
	{ id: 3, fullName: 'Abiral Khanal', username: 'abiral', role: 'MANAGER' },
	{ id: 4, fullName: 'Rafin Karki', username: 'rafin', role: 'EDITOR' },
	{ id: 5, fullName: 'Tushant Khatiwada', username: 'ptushantk', role: 'STAFF' },
];
