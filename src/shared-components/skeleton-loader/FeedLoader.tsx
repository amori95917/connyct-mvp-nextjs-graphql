import { Card } from '@/ui-elements/card';
import { Skeleton } from '../../ui-elements/loader/Skeleton';

export const FeedLoader = () => {
	return (
		<>
			<div className='bg-white mt-5 p-3 rounded-md'>
				<Card>
					<div className='flex justify-between'>
						<div className='flex items-center'>
							<Card.Avatar>
								<div>
									<Skeleton className={'h-12 w-12 rounded-full'} />
								</div>
							</Card.Avatar>
							<div className='flex flex-col ml-2'>
								<Card.Text type='title'>
									{/* <span className='font-bold text-xl'>{name}</span> */}
									<Skeleton className={'h-6 w-48 rounded-md'} />
								</Card.Text>
								<Card.Text type='faded'>
									<div className='text-gray-400'>
										<Skeleton className={'h-4 w-32 bg-gray-100 rounded-md my-2'} />
									</div>
								</Card.Text>
							</div>
						</div>
						<Card.Action>
							<Skeleton className={'h-6 w-6 rounded-md'} />
						</Card.Action>
					</div>
					<div>
						<Card.Text type='description'>
							<Skeleton className={'w-full h-3 rounded-md my-1'} />{' '}
							<Skeleton className={'w-1/3 h-3 my-1 rounded-md'} />
						</Card.Text>
					</div>
					<Card.Image>
						<Skeleton className={'h-129 w-full rounded-md'} />
					</Card.Image>
				</Card>
			</div>
		</>
	);
};
