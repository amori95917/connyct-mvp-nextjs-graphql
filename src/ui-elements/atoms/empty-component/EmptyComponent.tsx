import { DataNotFound } from './DataNotFoundIcon';

type EmptyComponentProps = {
	text?: string | React.ReactNode;
	subText?: string | React.ReactNode;
	icon?: React.ReactNode;
	ctaButton?: React.ReactNode;
};

export const EmptyComponent = (props: EmptyComponentProps) => {
	const {
		text = 'No results found',
		subText = 'We could not find any data for you',
		icon = <DataNotFound height='4em' width='4em' />,
		ctaButton,
	} = props;
	return (
		<>
			<div className='bg-white flex flex-col h-128 items-center justify-center mt-5 rounded-md w-full'>
				{icon}
				<span className='font-semibold mt-2 text-lg'>{text}</span>
				<span className='text-sm'>{subText}</span>
				{ctaButton}
			</div>
		</>
	);
};
