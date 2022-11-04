import Image from 'next/image';

import { User, Maybe } from '@/generated/graphql';

type PersonProps = {
	user: Maybe<User> | undefined;
};

const Person = (props: PersonProps) => {
	const { user } = props;
	return (
		<>
			{user ? (
				<div className='flex flex-col items-center mr-2 p-1 pb-3 rounded-md shadow-lg'>
					<div className='flex h-36 overflow-hidden rounded-md w-36'>
						<Image width={144} height={144} src={`https://i.pravatar.cc`} alt='Sunset in the mountains' />
					</div>
					<div className='flex flex-col'>
						<span className='font-bold ml-1 mt-1'>{user.fullName}</span>
						<span className='ml-1 mt-1 text-slate-400 text-sm'>{user.username}</span>
						<div className='flex mt-2'>
							<button className='bg-primary flex h-8 items-center ml-2 overflow-hidden p-2 rounded-md text-white'>
								Connect
							</button>
						</div>
					</div>
				</div>
			) : (
				<p>No User</p>
			)}
		</>
	);
};

export default Person;
