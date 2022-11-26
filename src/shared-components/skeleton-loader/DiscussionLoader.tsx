import { Skeleton } from '../../ui-elements/loader/Skeleton';

export const DiscussionsLoader = () => {
	return (
		<>
			{Array.from(Array(3)).map((arr, index) => (
				<div key={index} className='bg-white flex h-52 p-5'>
					<div className='flex flex-col justify-center w-10'>
						<Skeleton className={'w-full h-12  rounded-md my-1'} />
						<Skeleton className={'w-full h-12  rounded-md my-1'} />
					</div>
					<div className='flex flex-col w-full'>
						<Skeleton className={'h-5 ml-10  bg-gray-200 rounded-md my-1'} />
						<Skeleton className={'h-5 ml-10 w-1/2 bg-gray-200 rounded-md my-1'} />
						<Skeleton className={'h-3 ml-10  bg-gray-200 rounded-md my-1'} />
						<Skeleton className={'h-3 ml-10  bg-gray-200 rounded-md my-1'} />
						<Skeleton className={'h-3 ml-10  bg-gray-200 rounded-md my-1'} />
						<div className='bg-white flex justify-around mt-5'>
							<div className='h-8 w-8'>
								<Skeleton className={'h-full ml-10 w-full rounded-full  bg-gray-200 my-1'} />
							</div>
							<div className='h-6 w-6'>
								<Skeleton className={'h-full ml-10 w-full rounded-md  bg-gray-200 my-1'} />
							</div>
							<div className='h-6 w-6'>
								<Skeleton className={'h-full ml-10 w-full rounded-md  bg-gray-200 my-1'} />
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};
