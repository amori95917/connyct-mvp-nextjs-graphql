import { UserEdge } from '@/generated/graphql';
import { useUsers } from '@/hooks/services/useUsersQuery';
import Person from './Person';

const People = () => {
	const { users, loading, hasNextPage, totalCount } = useUsers();
	return (
		<>
			<div className='bg-white brands p-4 rounded-small'>
				<span className='flex justify-between'>
					<p className='font-bold text-gray text-lg'>People you may know</p>
				</span>
				<div className='gap-4 grid grid-cols-4 people pt-2'>
					{(users || []).map((userEdge: UserEdge) => {
						const { node: user } = userEdge;
						return <Person key={user?.id} user={user} />;
					})}
					{/* {people.map(person => (
								<div
									className='bg-white border-slate-100 border-solid border-x border-y mx-auto relative shadow-sm w-full'
									key={person.id}>
									<div className='flex justify-center'>
										<div className='h-32 relative w-32'>
											<Image
												src={person.image}
												alt=''
												className='-top-20 absolute border-4 border-white mx-auto rounded-full'
												layout='fill'
												objectFit='cover'
											/>
										</div>
									</div>

									<div className='mt-6'>
										<h1 className='font-bold text-center text-gray-900 text-xl'>{person.name}</h1>
										<p className='font-medium text-center text-gray-400 text-sm'>Believes in believing</p>
										<p>
											<span />
										</p>
										<div className='grid grid-cols-2 mt-5'>
											<button className='bg-primary block font-medium leading-6 py-3 text-center text-sm text-white'>
												Follow
											</button>
											<button className='block border-gray-200 border-solid border-x border-y font-medium leading-6 py-3 text-black text-center text-sm'>
												Cancel
											</button>
										</div>
									</div>
								</div>
							))} */}
				</div>
			</div>
		</>
	);
};

export default People;
