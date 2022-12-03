import { Skeleton } from '../../ui-elements/loader/Skeleton';

export const CommunitiesLoader = () => {
	return (
		<>
			<div className='gap-4 grid grid-cols-3 pt-4'>
				{Array.from(Array(3)).map((arr, index) => (
					<div key={arr} className='bg-white h-72 p-5 rounded-lg shadow-sm'>
						<div className='cursor-pointer h-2/3 relative w-full'>
							<Skeleton className='h-full rounded-md w-full' />
						</div>

						<p className='cursor-pointer font-bold text-center text-lg text-primary'>
							<Skeleton className='' />
						</p>

						<div className='participants pt-2'>
							<div className='flex items-center justify-center'>
								{[1, 2, 3, 4].map((image, index) => (
									<div className='cursor-pointer' key={index}>
										<Skeleton className='h-5 rounded-full w-5' />
									</div>
								))}

								<Skeleton className='bg-white cursor-pointer ml-2 px-2 rounded-md shadow-xl' />
							</div>
							<p className='pt-2 text-center text-gray-600'>
								<Skeleton className='h-5 w-full' />
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
