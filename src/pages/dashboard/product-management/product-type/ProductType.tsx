import Image from 'next/image';

const Variation = () => {
	return (
		<>
			<div className='bg-slate-50 flex heading p-4'>
				<div className='flex-1'>
					<p className='font-extrabold text-xl'>Manage Product Type</p>
					{/* <div className="h-64 w-64 relative">
						<Image
							src="https://cdn.shopify.com/shopifycloud/web/assets/v1/8a3efee78b2afb03385b2ef0ec7396ed.svg"
							alt="attributes"
							layout="fill"
							objectFit="cover"
						/>
					</div> */}
					<p className='font-light py-2 text-gray-600 text-md lg:leading-6'>
						Product type can be manageable. Product type can be Clothing, Accessories, Shoes and etc.
					</p>
				</div>
				<div className='w-full lg:w-4/12'>
					<div className='flex'>
						<button className='border-2 border-black border-solid duration-300 ease-in-out font-semibold mr-6 px-4 py-3 rounded-lg transition hover:bg-black hover:text-white'>
							Export CSV
						</button>
						<button className='border-2 border-primary border-solid duration-300 ease-in-out font-semibold mr-6 px-4 py-3 rounded-lg text-primary transition hover:bg-primary hover:text-white'>
							Setup product type
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Variation;
