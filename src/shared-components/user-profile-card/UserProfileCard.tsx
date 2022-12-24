import { useCurrentUser } from '@/hooks/services/useCurrentUserQuery';
import { Avatar } from '../avatar';

const slateSecondaryClassNames = 'text-slate-400';
const boldSecondaryTextClassNames = 'font-bold text-xl';
const spanContainerClassNames = 'flex flex-col items-center';

const UserProfileCard = () => {
	const { currentUser, loading } = useCurrentUser();
	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<>
			<div className='flex flex-col items-center mr-5 no-scrollbar overflow-y-scroll rounded-md md:h-screen md:sticky md:top-24'>
				<div className='bg-white rounded-md w-full'>
					<div className='p-3'>
						<div className='bg-gray-100 flex flex-col p-3 rounded-md'>
							<div className='flex items-center'>
								<div className='h-16 relative rounded-full w-16'>
									<Avatar
										imgSrc={currentUser?.avatar}
										name={currentUser?.username || currentUser?.fullName}
										alt={currentUser?.username || currentUser?.fullName}
										className='rounded-full'
										size='lg'
									/>
								</div>
								{/* TODO need to change visitor by using the graphql call */}
								<div className='flex flex-col pl-2'>
									<div className='flex font-bold h-fit items-center'>
										<p className='font-bold text-lg'>{currentUser?.fullName}</p>
									</div>
									<span className={`font-bold text-primary text-sm`}>{currentUser?.username}</span>
								</div>
							</div>
							<div className='flex justify-around mt-5 w-full'>
								<span className={spanContainerClassNames}>
									<span className={boldSecondaryTextClassNames}>80</span>
									<span className={slateSecondaryClassNames}>Brands Followed</span>
								</span>
								<span className={spanContainerClassNames}>
									<span className={boldSecondaryTextClassNames}>369</span>
									<span className={slateSecondaryClassNames}>Following</span>
								</span>
								<span className={spanContainerClassNames}>
									<span className={boldSecondaryTextClassNames}>180</span>
									<span className={slateSecondaryClassNames}>Followers</span>
								</span>
							</div>
						</div>
					</div>
					<div className='actions ml-5 mr-5 py-2'>
						<div className='align-center flex justify-between'>
							<button className='bg-gray-100 font-semibold px-10 py-3'>Edit Profile</button>
							<button className='bg-primary font-semibold px-10 py-3 text-white'>Share Profile</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserProfileCard;
