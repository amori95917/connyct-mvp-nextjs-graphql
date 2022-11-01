import Image from 'next/image';

const ProfilePicture = ({
	profilePicture = '/images/apple.jpeg', // TODO: Replace with placeholder circle with first letter of company name
	width = 56,
	height = 56,
}) => {
	return (
		<>
			<div className='flex h-10 w-10'>
				<Image
					className='rounded-full'
					width={width}
					height={height}
					src={profilePicture}
					alt='company-avatar'
				/>
			</div>
		</>
	);
};

export default ProfilePicture;
