import { Avatar } from '@/shared-components/avatar';

type ListData = {
	title: string;
	alt?: string;
	avatar?: string;
	metaTitle: string;
};

type ListViewProps = {
	data: ListData;
	renderActions?: () => JSX.Element;
};

const ListView = (props: ListViewProps) => {
	const { title, metaTitle, avatar, alt } = props.data;
	return (
		<>
			<div className='flex space-between w-full'>
				<div className='flex flex-1'>
					<div className='h-16 overflow-hidden relative rounded-full w-16'>
						<Avatar imgSrc={avatar} name={title} alt={alt || title} />
					</div>
					<div className='flex flex-col'>
						<p className='font-bold'> {title}</p>
						<span className='text-slate-400'>{metaTitle}</span>
					</div>
				</div>
				{typeof props.renderActions === 'function' && (
					<div className='actions'>{props.renderActions()}</div>
				)}
			</div>
		</>
	);
};

export default ListView;
