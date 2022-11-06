import { DataNotFound } from './DataNotFoundIcon';

// import { AiOutlineArrowUp } from 'react-icons/ai';
type EmptyComponentProps = {
	text?: string | React.ReactNode;
	subText?: string | React.ReactNode;
	icon?: React.ReactNode;
};

export const EmptyComponent = (props: EmptyComponentProps) => {
	const {
		text = 'No results found',
		subText = 'We could not find any data for you',
		icon = <DataNotFound height='4em' width='4em' />,
	} = props;
	return (
		<>
			<div className='bg-white flex flex-col h-128 items-center justify-center mt-5 rounded-md w-full'>
				{icon}
				<span className='font-semibold text-1xl'>{text}</span>
				<span className='text-sm'>{subText}</span>
			</div>
		</>
	);
};
