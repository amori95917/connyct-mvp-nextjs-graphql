import AddProductDrawer from '@/shared-components/drawers/add-product-drawer/AddProductDrawer';
import Image from 'next/image';
import { useState } from 'react';

const Products = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const handleDrawerOpen = () => setOpenDrawer(!openDrawer);
	const handleDrawerClose = () => setOpenDrawer(false);

	return (
		<>
			<div className='flex items-center justify-between px-4'>
				<p className='font-bold'>Products</p>
				<button className='bg-primary px-4 py-2 rounded text-white' onClick={handleDrawerOpen}>
					Add new product
				</button>
			</div>
			{openDrawer && <AddProductDrawer isDrawerOpen={openDrawer} onDrawerClose={handleDrawerClose} />}
			<div className='flex flex-wrap justify-center'>
				{PRODUCTS.map(product => {
					return (
						<div className='p-2 w-full md:w-1/3' key={product.id}>
							<div className='bg-white rounded-lg shadow-lg'>
								<Image
									src={product.image}
									alt='Product 1'
									className='h-48 object-cover rounded-t-lg w-full'
									width='400'
									height='400'
								/>
								<div className='p-4'>
									<h3 className='font-bold mb-2 text-gray-800 text-lg'>{product.name}</h3>
									<p className='mb-2 text-gray-700'>{product.price}</p>
									<p className='text-gray-600 text-sm'>{product.shortDescription}</p>
									<div className='add-to-cart mt-4'>
										{/* <svg
											className='h-6 mr-2 w-6'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
											xmlns='http://www.w3.org/2000/svg'>
											<defs>
												<linearGradient id='gradient' x1='50%' x2='50%' y1='0%' y2='100%'>
													<stop offset='0%' stop-color='#00B4DB' />
													<stop offset='100%' stop-color='#0083B0' />
												</linearGradient>
											</defs>
											<path
												stroke='url(#gradient)'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
											/>
										</svg> */}
										<div className='flex justify-end'>
											<svg
												className='h-6 mr-2 w-6'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'>
												<defs>
													<linearGradient id='gradient' x1='50%' x2='50%' y1='0%' y2='100%'>
														<stop offset='0%' stop-color='#5A6399' />
														<stop offset='50%' stop-color='#5A6399' />
														<stop offset='100%' stop-color='#ea9a7e' />
													</linearGradient>
												</defs>
												<path
													stroke='url(#gradient)'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={3.5}
													d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 2.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
												/>
											</svg>
											<svg
												className='h-6 mr-2 w-6'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'>
												<defs>
													<linearGradient id='gradient' x1='50%' x2='50%' y1='0%' y2='100%'>
														<stop offset='0%' stop-color='#5A6399' />
														<stop offset='100%' stop-color='#ea9a7e' />
													</linearGradient>
												</defs>
												<path
													stroke='url(#gradient)'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={3.5}
													d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z'
												/>
												<path
													stroke='url(#gradient)'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2.5}
													d='M14 2v6h6M16 13H8M16 17H8'
												/>
											</svg>
											<svg
												className='h-6 mr-2 w-6'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'>
												<defs>
													<linearGradient id='gradient' x1='50%' x2='50%' y1='0%' y2='100%'>
														<stop offset='0%' stop-color='#5A6399' />
														<stop offset='100%' stop-color='#ea9a7e' />
													</linearGradient>
												</defs>
												<path
													stroke='url(#gradient)'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={3.5}
													d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
												/>
											</svg>
											<svg
												className='h-6 mr-2 w-6'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'>
												<defs>
													<linearGradient id='gradient' x1='50%' x2='50%' y1='0%' y2='100%'>
														<stop offset='0%' stop-color='#5A6399' />
														<stop offset='100%' stop-color='#ea9a7e' />
													</linearGradient>
												</defs>
												<path
													stroke='url(#gradient)'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M6 20L18 12 6 4'
												/>
											</svg>
											<svg
												className='h-6 mr-2 w-6'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'>
												<defs>
													<linearGradient id='gradient' x1='50%' x2='50%' y1='0%' y2='100%'>
														<stop offset='0%' stop-color='#5A6399' />
														<stop offset='100%' stop-color='#ea9a7e' />
													</linearGradient>
												</defs>
												<path
													stroke='url(#gradient)'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={3.5}
													d='M6 18L18 12 6 6'
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Products;

const PRODUCTS = [
	{
		id: 1,
		name: 'Product 1',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/dri-fit.jpeg',
	},
	{
		id: 2,
		name: 'Product 2',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/air.jpeg',
	},
	{
		id: 3,
		name: 'Product 3',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/jordan1.jpeg',
	},
	{
		id: 4,
		name: 'Product 4',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/tshirt.jpeg',
	},
	{
		id: 5,
		name: 'Product 5',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/air.jpeg',
	},
	{
		id: 6,
		name: 'Product 6',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/air.jpeg',
	},
	{
		id: 7,
		name: 'Product 7',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at enim non sem blandit pretium eu et justo',
		price: '$50',
		image: '/images/product/jordan1.jpeg',
	},
];
