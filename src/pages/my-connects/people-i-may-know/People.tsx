import { Suspense } from 'react';
import PersonFetcher from './PersonFetcher';

const People = () => {
	return (
		<>
			<div className='bg-white brands p-4 rounded-small'>
				<span className='flex justify-between'>
					<p className='font-bold text-gray text-lg'>People you may know</p>
				</span>
				<div className='gap-4 grid grid-cols-4 people pt-2'>
					<Suspense>
						<PersonFetcher />
					</Suspense>
				</div>
			</div>
		</>
	);
};

export default People;
