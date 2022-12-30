import { UilCalender, UilImages, UilLabelAlt } from '@iconscout/react-unicons';
import { useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import { Avatar } from '../avatar';
import { RightDrawerLayout } from '../layouts/right-drawer-layout';
import { PostPopup } from '../post-popup';
import { ProductPostForm } from './product-post-form';

const CreatePost = props => {
	const { actions, onPostSubmit, authorizedUser, submitting } = props;
	const [showPostPopup, setShowPostPopup] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { ref, isClose, setIsClose } = useClickOutside();

	const onCommonButtonClickHandler = () => {
		setShowPostPopup(true);
		setIsClose(true);
	};

	const onProductClickHandler = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const handlePostSubmit = (value: any, cb?: () => void) => {
		onPostSubmit(value);
		cb && cb();
	};

	const getActiveRole = user => {
		return user?.activeRole?.name;
	};

	const postButtonClassName = 'flex justify-center p-2 rounded-full grow hover:bg-gray-300';

	console.log('authorizedUser', authorizedUser);

	return (
		<>
			{showPostPopup && isClose && (
				<PostPopup
					authorizedUser={authorizedUser}
					setShowPostPopup={setShowPostPopup}
					ref={ref}
					handlePostSubmit={handlePostSubmit}
					submitting={submitting}
				/>
			)}
			{
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} drawerSize='3xl'>
					<ProductPostForm />
				</RightDrawerLayout>
			}
			<div className='bg-white flex flex-col p-5 rounded-md w-full'>
				<div className='flex'>
					<div className='h-16 relative w-16'>
						<Avatar
							className='rounded-full'
							imgSrc={
								getActiveRole(authorizedUser) === 'USER'
									? authorizedUser?.userProfile?.profileImage
									: authorizedUser?.company[0]?.avatar
							}
							name={
								getActiveRole(authorizedUser) === 'USER'
									? authorizedUser?.username || authorizedUser?.fullName
									: authorizedUser?.company[0]?.name || authorizedUser?.company[0]?.legalName
							}
							alt={
								getActiveRole(authorizedUser) === 'USER'
									? authorizedUser?.username || authorizedUser?.fullName
									: authorizedUser?.company[0]?.name || authorizedUser?.company[0]?.legalName
							}
						/>
					</div>
					<div className='grow ml-4 rounded-full'>
						<button
							onClick={onCommonButtonClickHandler}
							className='bg-gray-200 p-3 rounded-full text-gray-400 text-left w-full hover:bg-gray-300'>
							say something that inspires
						</button>
					</div>
				</div>
				<div className='flex gap-4 justify-center mt-2 w-full'>
					{actions.includes('media') && (
						<button onClick={onCommonButtonClickHandler} className={postButtonClassName}>
							<UilImages fill='#50c7a6' className='mr-2' size={25} /> Media
						</button>
					)}
					{actions.includes('events') && (
						<button onClick={onCommonButtonClickHandler} className={postButtonClassName}>
							<UilCalender className='mr-2' fill='#5abff8' size={20} /> Events
						</button>
					)}
					{actions.includes('products') && (
						<button onClick={onProductClickHandler} className={postButtonClassName}>
							<UilLabelAlt className='mr-2' fill='#DCA3F7' size={25} /> Products
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default CreatePost;
