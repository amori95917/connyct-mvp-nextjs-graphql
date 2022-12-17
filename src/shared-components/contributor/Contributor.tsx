import { UilCommentInfo } from '@iconscout/react-unicons';
import { Avatar } from '../avatar';

type ContibuitorsProps = {
	imgSrc: string;
	name: string;
	replies: number;
};

const Contributor = (props: ContibuitorsProps) => {
	const { imgSrc, name, replies } = props;
	return (
		<>
			<div className='flex gap-4 items-center justify-start'>
				<Avatar
					imgSrc={imgSrc}
					alt=''
					className='rounded-full'
					wrapperClassName='cursor-pointer h-8 relative rounded-full w-8'
				/>
				<div className='flex gap-3'>
					<div className='font-bold'>
						<span className='cursor-pointer text-sm'>{name}</span>
					</div>
					<div className='flex gap-1 items-center'>
						<span>
							<UilCommentInfo fill='#50c7a6' />
						</span>
						<span>{replies}</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Contributor;
