import { Avatar } from '@/shared-components/avatar';
import { AvatarProps } from '@/shared-components/avatar/Avatar';

type ItemProps = {
	title: string;
	metaTitle?: string;
};

type CardViewProps = {
	avatar: AvatarProps;
	item: ItemProps;
	renderActions: () => JSX.Element;
};

const CardView = (props: CardViewProps) => {
	const { avatar, item, renderActions } = props;
	const { title, metaTitle } = item;
	return (
		<>
			<div className='flex flex-col items-center p-2 rounded-md shadow-lg'>
				<div className='flex h-20 overflow-hidden rounded-md w-20'>
					<Avatar {...avatar} imgSrc={avatar.imgSrc} name={title} alt={title} size={avatar.size} />
				</div>
				<div className='flex flex-col mb-0 mt-2 pl-4 w-full'>
					<span className='font-medium'>{title}</span>
					{metaTitle && <span className='text-slate-400 text-sm'>{metaTitle}</span>}
					{typeof renderActions === 'function' && renderActions()}
				</div>
			</div>
		</>
	);
};

export default CardView;
