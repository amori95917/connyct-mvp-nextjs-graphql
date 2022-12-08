import { useState } from 'react';
import Image from 'next/image';

import { BiImages } from 'react-icons/bi';
import { BsCameraVideo, BsCalendar3Event } from 'react-icons/bs';
import { RiStockLine } from 'react-icons/ri';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';

import { useClickOutside } from '@/hooks/useClickOutside';
import { getCookie } from '@/utils/cookies';
import { PostPopup } from '../post-popup';
import { RightDrawerLayout } from '../layouts/right-drawer-layout';
import { ProductPostForm } from './product-post-form';

const CreatePost = props => {
	const { visitedCompany } = props;
	const [showPostPopup, setShowPostPopup] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { ref, isClose, setIsClose } = useClickOutside();
	const { company } = getCookie('CONNYCT_USER') ?? {};

	const onCommonButtonClickHandler = () => {
		setShowPostPopup(true);
		setIsClose(true);
	};

	const onProductClickHandler = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const postButtonClassName = 'flex justify-center p-2 rounded-full grow hover:bg-gray-300';
	return (
		<>
			{showPostPopup && isClose && (
				<PostPopup
					company={company}
					setShowPostPopup={setShowPostPopup}
					ref={ref}
					visitedCompany={visitedCompany}
				/>
			)}
			{
				<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
					<ProductPostForm />
				</RightDrawerLayout>
			}
			<div className='bg-white flex flex-col p-5 rounded-md w-full'>
				<div className='flex'>
					<div>
						<Image
							className='rounded-full'
							width={45}
							height={45}
							src='https://i.pravatar.cc'
							alt='Sunset in the mountains'
						/>
					</div>
					<div className='grow ml-5 rounded-full'>
						<button
							onClick={onCommonButtonClickHandler}
							className='bg-gray-200 p-3 rounded-full text-gray-400 text-left w-full hover:bg-gray-300'>
							say something that inspires
						</button>
					</div>
				</div>
				<div className='flex gap-4 justify-center mt-2 w-full'>
					<button onClick={onCommonButtonClickHandler} className={postButtonClassName}>
						<BiImages fill='#50c7a6' className='mr-2' size={25} /> Media
					</button>
					<button onClick={onCommonButtonClickHandler} className={postButtonClassName}>
						<BsCalendar3Event className='mr-2' fill='#5abff8' size={20} /> Events
					</button>
					<button onClick={onProductClickHandler} className={postButtonClassName}>
						<MdOutlineProductionQuantityLimits className='mr-2' fill='#DCA3F7' size={25} /> Products
					</button>
				</div>
			</div>
		</>
	);
};

export default CreatePost;
