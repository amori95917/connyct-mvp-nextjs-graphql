import { useState } from 'react';
import Image from 'next/image';
import { formatDistance } from 'date-fns';
// import parse from 'html-react-parser';
import { UilAngleDown, UilAngleUp, UilEllipsisV } from '@iconscout/react-unicons';

import { DiscussionActionsDropdown } from '../drop-down/DiscussionActionsDropdown';

export const DiscussionReply = ({ index, node }: { index: number | string }) => {
	const [vote, setVote] = useState(20);
	const [showReplyForm, setShowReplyForm] = useState(false);
	const [selectedComment, setSelectedComment] = useState(0);
	const [showActions, setShowActions] = useState<{ index: number | undefined; show: boolean }>({
		index: undefined,
		show: false,
	});

	const handelVoteUp = () => {
		setVote(vote + 1);
	};
	const handelVoteDown = () => {
		setVote(vote - 1);
	};

	const handleReplyFormClick = (index: number) => {
		setSelectedComment(index);
		setShowReplyForm(true);
	};

	const onActionClickHandler = (index: number) => {
		setShowActions({ index: index, show: !showActions.show });
	};
	return (
		<>
			<div className='bg-gray-200 mt-4 px-4 py-2 rounded-md w-full'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<div className='h-8 relative w-8'>
							<Image src={'https://i.pravatar.cc/'} fill className={'rounded-full'} alt={'Image'} />
						</div>
						<div className='flex flex-col ml-2'>
							<span className='font-bold text-md'>Joseff</span>
							<span className='text-gray-400'>
								{formatDistance(new Date('Thu Nov 17 2022 01:07:25 GMT+0545 (Nepal Time)'), new Date(), {
									addSuffix: true,
								})}
							</span>
						</div>
					</div>
					<div className='mb-5'>
						<button
							onClick={() => {
								onActionClickHandler(index);
							}}
							id='dropdownDefault'
							data-dropdown-toggle='dropdown'
							className='font-medium inline-flex items-center px-4 py-2.5 rounded-lg text-center text-sm text-white hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300'
							type='button'
						>
							<UilEllipsisV fill='black' />
						</button>
						{showActions.show && index == showActions.index && <DiscussionActionsDropdown />}
					</div>
				</div>
				<div>
					<div
						className='mt-2 text-md text-slate-800'
						dangerouslySetInnerHTML={{ __html: node.answer || '' }}
					/>
				</div>
				<div className='bg-slate-300 h-px mt-4'></div>
				<div className='flex items-center pt-4'>
					<button className='mr-1 text-slate-600 hover:text-primary' onClick={handelVoteUp}>
						<UilAngleUp size={24} />
					</button>
					<span className='font-semibold text-primary text-xl'>0</span>
					<button className='ml-1 text-slate-600 hover:text-rose-600' onClick={handelVoteDown}>
						<UilAngleDown size={24} />
					</button>
				</div>
			</div>
		</>
	);
};
