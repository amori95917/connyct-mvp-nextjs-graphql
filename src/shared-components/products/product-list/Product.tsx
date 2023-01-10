import { Product } from '@/generated/graphql';
import Image from 'next/image';

type ProductProps = {
	item: Product;
};

const Product = (props: ProductProps) => {
	const { item } = props;
	return (
		<>
			<div className='p-2 w-full md:w-1/3'>
				<div className='bg-white rounded-lg shadow-lg'>
					<Image
						src={'/'}
						alt='Product 1'
						className='h-48 object-cover rounded-t-lg w-full'
						width='400'
						height='400'
					/>
					<div className='p-4'>
						<h3 className='font-bold mb-2 text-gray-800 text-lg'>{item.productName}</h3>
						<p className='mb-2 text-gray-700'>{item.price}</p>
						<p className='text-gray-600 text-sm'>{item.description || 'Description'}</p>
						<div className='add-to-cart mt-4'>
							<div className='flex justify-end'>
								<svg
									className='h-6 mr-2 w-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'>
									<defs>
										<linearGradient id='gradient' x1='50%' x2='50%' y1='0%' y2='100%'>
											<stop offset='0%' stopColor='#5A6399' />
											<stop offset='50%' stopColor='#5A6399' />
											<stop offset='100%' stopColor='#ea9a7e' />
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
											<stop offset='0%' stopColor='#5A6399' />
											<stop offset='100%' stopColor='#ea9a7e' />
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
											<stop offset='0%' stopColor='#5A6399' />
											<stop offset='100%' stopColor='#ea9a7e' />
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
											<stop offset='0%' stopColor='#5A6399' />
											<stop offset='100%' stopColor='#ea9a7e' />
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
											<stop offset='0%' stopColor='#5A6399' />
											<stop offset='100%' stopColor='#ea9a7e' />
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
		</>
	);
};

export default Product;
