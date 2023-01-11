import { Button } from '@/ui-elements/atoms/button';
import { useState } from 'react';
import { Avatar } from '../avatar';
import { List } from '../list';

type StaffProps = {
	item: any;
	handleShowMessagePopup?: () => void;
};

const Staff = (props: StaffProps) => {
	const { item, handleShowMessagePopup } = props;
	const handleMessagePopup = () => {
		// handleShowMessagePopup();
		console.log('show popup');
	};
	return (
		<>
			<List className='pb-6'>
				<div className='flex space-between w-full'>
					<div className='flex flex-1'>
						<div className='h-16 overflow-hidden relative rounded-full w-16'>
							<List.Avatar>
								<Avatar imgSrc={''} name={item.fullName} alt={item.fullName} />
							</List.Avatar>
						</div>
						<div className='flex flex-col'>
							<List.Title>
								<p className='font-bold'> {item.fullName}</p>
							</List.Title>
							<List.Meta>
								<span className='text-slate-400'>{item.username}</span>
							</List.Meta>
						</div>
					</div>

					{item.role === 'STAFF' && (
						<List.Actions>
							<div className=''>
								<Button onClick={handleMessagePopup}>Message</Button>
							</div>
						</List.Actions>
					)}
				</div>
			</List>
		</>
	);
};

export default Staff;
