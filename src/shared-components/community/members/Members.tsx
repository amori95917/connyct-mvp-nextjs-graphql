import { Input } from 'src/ui-elements/atoms/forms/input';
import { ProfileCard } from '@/shared-components/profile-card';

export const CommunityMembers = () => {
	return (
		<>
			<div className='bg-white gap-4 p-5 rounded-md w-4/5'>
				<span className='font-bold py-3 text-xl'>Members &bull;64,532</span>
				<div className='py-4'>
					<Input id='member' name='member' placeholder='Find a member' />
				</div>
				<hr className='bg-gray-200 border-0 h-px mb-4 pl-10 dark:bg-gray-700' />
				<div>
					<span className='font-bold py-3 text-lg'>Admins & moderators &bull;8</span>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
				</div>
				<hr className='bg-gray-200 border-0 h-px mb-4 pl-10 dark:bg-gray-700' />
				<div>
					<span className='font-bold py-3 text-lg'>Members &bull;8</span>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
					<ProfileCard
						profileImage='https://i.pravatar.cc'
						name='Kiran Budhathoki'
						role='Admin'
						info='This is me'
					/>
				</div>
			</div>
		</>
	);
};
export default CommunityMembers;
