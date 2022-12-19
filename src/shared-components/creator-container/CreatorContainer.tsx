import Image from 'next/image';
import { Maybe } from 'graphql/jsutils/Maybe';
import formatDistance from 'date-fns/formatDistance';
import { Avatar } from '@/shared-components/avatar';

type CreatorContainerProps = {
	fullName: string;
	userName: string;
	createdAt?: string;
	avatar: string;
};

export const CreatorContainer: React.FC<CreatorContainerProps> = props => {
	const { fullName, userName, createdAt, avatar } = props;
	return (
		<>
			<div className='flex items-center'>
				<div className='h-12 relative w-12'>
					<Avatar imgSrc={avatar} name={userName || fullName} />
				</div>
				<div className='flex flex-col ml-2'>
					<span className='font-bold text-lg'>{userName || fullName}</span>
					{createdAt && (
						<span className='text-gray-400'>
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
