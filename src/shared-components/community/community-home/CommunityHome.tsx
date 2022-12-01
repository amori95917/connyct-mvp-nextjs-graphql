import Image from 'next/image';
import { BiImages } from 'react-icons/bi';
import { BsCalendar3Event, BsCameraVideo } from 'react-icons/bs';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { RiStockLine } from 'react-icons/ri';

import FeedActions from '@/shared-components/feed-actions/FeedActions';

const postButtonClassName =
	'bg-gray-200 flex justify-around p-2 rounded-full w-32 hover:bg-gray-300';

const CommunityHome = () => {
	return (
		<div>
			<div className='flex'>
				<div className='flex flex-col gap-4 w-3/5'>
					<div>
						<div className='bg-white flex flex-col p-5 rounded-md'>
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
								<div className='grow ml-5 rounded-md'>
									<button className='bg-gray-200 p-3 rounded-md text-gray-400 text-left w-full hover:bg-gray-300'>
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
								<button className={postButtonClassName}>
									<BiImages fill='#50c7a6' size={25} /> Photos
								</button>
								<button className={postButtonClassName}>
									<BsCameraVideo fill='#EB4D89' size={25} /> Videos
								</button>
								<button className={postButtonClassName}>
									<BsCalendar3Event fill='#5abff8' size={20} /> Events
								</button>
								<button className={postButtonClassName}>
									<RiStockLine fill='#5abff8' size={25} /> Promotions
								</button>
								<button className={postButtonClassName}>
									<MdOutlineProductionQuantityLimits fill='#DCA3F7' size={25} /> Products
								</button>
							</div>
						</div>
					</div>
					<div className=''>
						<span className='font-bold p-5 text-2xl'>Posts</span>
						<div className='bg-white p-5 rounded-md w-full'>
							<div className='cursor-pointer flex items-center justify-start'>
								<div className='h-12 relative rounded-full w-12'>
									<Image
										src='https://i.pravatar.cc/200'
										alt=''
										className='rounded-full'
										width='400'
										height='400'
									/>
								</div>
								<div className='company-name pl-4'>
									<div className='font-bold text-xl'>Community Name</div>
									<p className='text-gray-400 text-xs'>2023-02-03</p>
								</div>
							</div>

							<p className='py-4 text-base text-gray-700'>This is post one</p>
							<div className='bg-dark columns-2 gap-x-3 mx-auto space-y-3 w-100'>
								<div className='break-inside-avoid overflow-hidden rounded-md shadow-sm'>
									<Image
										className='w-full'
										width='200'
										height='200'
										src={'https://i.pravatar.cc/200'}
										alt='Sunset in the mountains'
									/>
								</div>
							</div>
							<FeedActions
								likesData={{ getLikesByPost: { totalCount: 10 } }}
								commentLength={0}
								onCommentClickHandler={() => undefined}
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-4 ml-4 w-2/5'>
					{/* About */}
					<div className='bg-white p-4 rounded-md'>
						<span className='font-bold text-2xl'>About</span>
						<p className='py-1 text-slate-500'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam obcaecati blanditiis ducimus
							tempore aliquid dolores? Sed debitis consectetur esse adipisci?
						</p>
					</div>
					<div className='bg-white p-4 rounded-md'>
						<span className='font-bold text-2xl'>Trending Topics</span>
						<div className='flex flex-col gap-4 py-5'>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
							<div className='flex flex-col'>
								<span className='text-xl'>#tag1</span>
								<span>100 posts</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CommunityHome;
