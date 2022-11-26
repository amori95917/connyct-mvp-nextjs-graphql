import { Skeleton } from '@/ui-elements/loader/Skeleton';

export const DiscussionViewLoader = () => {
	return (
		<div className='bg-white p-5'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<div className='h-16 relative w-16'>
						<Skeleton className='h-full rounded-full w-full' />
					</div>
					<div className='flex flex-col ml-2'>
						<Skeleton className={'h-6 w-48 rounded-md'} />
						<span className='text-gray-400'>
							<Skeleton className={'h-4 w-32 bg-gray-100 rounded-md my-2'} />
						</span>
					</div>
				</div>
				<div className='mb-5'>
					<Skeleton className={'h-6 w-6 bg-gray-200 rounded-md my-2'} />
				</div>
			</div>
			<div className='flex ml-2 pl-16 w-full'>
				<div className='w-full'>
					<Skeleton className={'h-5 w-32 bg-gray-200 rounded-md my-2'} />
					<div className='mt-5 text-slate-800'>
						<Skeleton className={'h-4 w-full bg-gray-100 rounded-md my-2'} />
						<Skeleton className={'h-4 w-full bg-gray-100 rounded-md my-2'} />
						<Skeleton className={'h-4 w-1/2 bg-gray-100 rounded-md my-2'} />
					</div>
				</div>
			</div>
			<div className='flex font-bold gap-3 items-center ml-3 mt-3 text-gray-600'>
				<Skeleton className={'h-6 w-5 bg-gray-300 rounded-md my-2'} />
				<Skeleton className={'h-6 w-5 bg-gray-100 rounded-md my-2'} />
				<Skeleton className={'h-6 w-5 bg-gray-300 rounded-md my-2'} />
				<Skeleton className={'h-6 w-20 bg-gray-100 rounded-md my-2'} />
				<Skeleton className={'h-6 w-20 bg-gray-100 rounded-md my-2'} />
			</div>
		</div>
	);
};
