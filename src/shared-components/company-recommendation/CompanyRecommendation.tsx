import Image from 'next/image';

const CompanyRecommendation = () => {
	return (
		<>
			<div className='bg-white grow mt-5 pb-2 rounded-md sticky top'>
				<p className='font-bold mt-2 pl-5 text-xl'>Recommended for you</p>
				<div className='bg-slate-300 h-px ml-5 mr-5 mt-3'></div>
				<div className='flex items-center ml-5 mt-3'>
					<div className='flex h-14 w-14'>
						<Image
							className='rounded-full'
							width={56}
							height={56}
							src='https://i.pravatar.cc'
							alt='Sunset in the mountains'
						/>
					</div>
					<span className='flex flex-col ml-2 text-sm'>
						<span className='font-bold text-xl'>zara</span>
						<span className='flex text-slate-500'>Its Brand not name</span>
					</span>
				</div>
				<div className='flex items-center ml-5 mt-3'>
					<div className='flex h-14 w-14'>
						<Image
							className='rounded-full'
							width={56}
							height={56}
							src='https://i.pravatar.cc'
							alt='Sunset in the mountains'
						/>
					</div>
					<span className='flex flex-col text-sm'>
						<span className='flex flex-col ml-2 text-sm'>
							<span className='font-bold text-xl'>Nike</span>
							<span className='flex text-slate-500'>Go extra mile further</span>
						</span>
					</span>
				</div>
			</div>
		</>
	);
};

export { CompanyRecommendation };
