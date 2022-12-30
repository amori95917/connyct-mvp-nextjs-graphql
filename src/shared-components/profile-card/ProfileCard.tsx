import { User } from '@/generated/graphql';
import { Avatar } from '../avatar';

type ProfileProps = {
	profileImage: string;
	name: string;
	role: string;
	info: string;
	userId: string;
	authorizedUser: User;
};
export const ProfileCard = (props: ProfileProps) => {
	const { profileImage, name, role, info, userId, authorizedUser } = props;
	return (
		<>
			<div className='flex justify-between px-5 py-3 relative'>
				{/* image */}
				<div className='flex gap-4'>
					<div className='h-10 relative rounded-full w-10'>
						<Avatar
							imgSrc={profileImage}
							name={name}
							alt={name || 'community-member'}
							className='cursor-pointer rounded-full'
						/>
					</div>
					{/* info */}
					<div className='flex flex-col'>
						<div>
							<span id='name' className='cursor-pointer font-bold py-3 text-lg'>
								{name}
							</span>
						</div>
						<div>
							<span className='py-3 text-sm'>{role}</span>
						</div>
						<div>
							<span className='py-3 text-lg'>{info}</span>
						</div>
					</div>
				</div>
				{userId !== authorizedUser?.id && (
					<div className='flex items-center'>
						<button className='bg-primary px-6 py-2 text-white'>Connect</button>
					</div>
				)}
			</div>
		</>
	);
};
