import { useState } from 'react';
import Image from 'next/image';

import { BiImages } from 'react-icons/bi';
import { BsCameraVideo, BsCalendar3Event } from 'react-icons/bs';
import { RiStockLine } from 'react-icons/ri';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';

import { useClickOutside } from '@/hooks/useClickOutside';
import { getCookie } from '@/utils/cookies';
import { PostPopup } from './post-popup';
import { ProductPostDrawer } from './product-post-drawer';

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

	const postButtonClassName =
		'bg-gray-200 flex justify-around p-2 rounded-full w-32 hover:bg-gray-300';
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
			{<ProductPostDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />}
			<div className='bg-white flex flex-col p-5 rounded-md w-full'>
				<div className='flex'>
					<div>
						<Image
							className='rounded-full'
							width={55}
							height={55}
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
						{/* <FormTextArea
								id='status-id'
								name='status'
								atomClassName={'bg-gray-200 resize-none h-8 p-3 w-full'}
								className='bg-white'
								register={register}
								errors={errors}
								placeholder='Say something that inspires'
							/> */}
					</div>
				</div>
				<div className='flex gap-4 justify-between mt-1 w-full'>
					<button onClick={onCommonButtonClickHandler} className={postButtonClassName}>
						<BiImages fill='#50c7a6' size={25} /> Photos
					</button>
					<button onClick={onCommonButtonClickHandler} className={postButtonClassName}>
						<BsCameraVideo fill='#EB4D89' size={25} /> Videos
					</button>
					<button onClick={onCommonButtonClickHandler} className={postButtonClassName}>
						<BsCalendar3Event fill='#5abff8' size={20} /> Events
					</button>
					<button onClick={onCommonButtonClickHandler} className={postButtonClassName}>
						<RiStockLine fill='#5abff8' size={25} /> Promotions
					</button>
					<button onClick={onProductClickHandler} className={postButtonClassName}>
						<MdOutlineProductionQuantityLimits fill='#DCA3F7' size={25} /> Products
					</button>
				</div>
			</div>
		</>
	);
};

export default CreatePost;
