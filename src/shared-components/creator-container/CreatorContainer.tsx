import { Avatar } from '@/shared-components/avatar';
import formatDistance from 'date-fns/formatDistance';

type CreatorContainerProps = {
	fullName: string;
	userName: string;
	createdAt?: string;
	avatar?: string | null;
};

export const CreatorContainer: React.FC<CreatorContainerProps> = props => {
	const { fullName, userName, createdAt, avatar } = props;
	return (
		<>
			<div className='flex items-center'>
				<div className='h-14 relative w-14'>
					<Avatar imgSrc={avatar} name={userName || fullName} alt='creator-avatar' />
				</div>
				<div className='flex flex-col ml-2'>
					<span className='font-bold text-lg'>{userName || fullName}</span>
					{createdAt && (
						<span className='text-gray-400 text-sm'>
							{formatDistance(new Date(createdAt || '2022-11-23T15:33:30.852Z'), new Date(), {
								addSuffix: true,
							})}
						</span>
					)}
				</div>
			</div>
		</>
	);
};
