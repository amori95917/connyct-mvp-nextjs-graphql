import { useRouter } from 'next/router';
import { useState } from 'react';
import { UilAngleDown, UilAngleUp, UilEllipsisV } from '@iconscout/react-unicons';
// import parse from 'html-react-parser'; TODO: will either use dynamic import or other alternative

import { CreatorContainer } from '@/shared-components/creator-container/CreatorContainer';
import { DiscussionAnswer as DiscussionAnswerType } from '@/generated/graphql';
import AnswerReplyForm from '../answer-reply-form/AnswerReplyForm';
import { DiscussionReply } from '../discussion-answer-reply/discussionAnswerReply';
import { DiscussionActionsDropdown } from '../drop-down/DiscussionActionsDropdown';
import { useDiscussionVote } from '../../useDiscussionHooks';

export const DiscussionAnswer = ({
	answer,
	index,
	loading,
}: {
	index: string | number;
	answer: DiscussionAnswerType;
	loading: boolean;
}) => {
	const router = useRouter();
	const [showReplyForm, setShowReplyForm] = useState(false);
	const [selectedComment, setSelectedComment] = useState<number | string>(0);
	const [showActions, setShowActions] = useState<boolean>(false);

	const { discussionSlug } = router.query;
	const { handleDiscussionAnswerVoteUp, handleDiscussionAnswerVoteDown } =
		useDiscussionVote(discussionSlug);

	const handleReplyFormClick = (index: number) => {
		setSelectedComment(index);
		setShowReplyForm(true);
	};

	const onActionClickHandler = () => {
		setShowActions(!showActions);
	};

	const onClickUpvote = () => {
		handleDiscussionAnswerVoteUp(answer?.id, 0);
	};

	const onClickDownvote = () => {
		handleDiscussionAnswerVoteDown(answer?.id, 0);
	};

	return (
		<div className='bg-gray-50 mt-5 px-4 py-2 rounded-md'>
			<div className='flex justify-between'>
				<CreatorContainer
					userName={answer?.user?.username || answer?.user?.fullName}
					fullName={answer?.user?.fullName}
					createdAt={answer?.createdAt}
					avatar={null}
				/>
				<div className='mb-5'>
					<button
						onClick={onActionClickHandler}
						id='dropdownDefault'
						data-dropdown-toggle='dropdown'
						className='font-medium inline-flex items-center px-4 py-2.5 rounded-lg text-center text-sm text-white hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300'
						type='button'>
						<UilEllipsisV fill='black' />
					</button>
					{showActions && <DiscussionActionsDropdown />}
				</div>
			</div>
			<div className='mt-2 reply'>
				<div className='text-slate-800' dangerouslySetInnerHTML={{ __html: answer.answer || '' }} />
			</div>
			<div className='bg-slate-200 h-px mt-4'></div>
			<div className='flex items-center pt-4'>
				<button className='mr-1 text-slate-600 hover:text-blue-600' onClick={onClickUpvote}>
					<UilAngleUp size={24} />
				</button>
				<span className='font-semibold text-primary text-xl'>{answer?.upVote || 0}</span>
				<button className='ml-1 text-slate-600 hover:text-rose-600' onClick={onClickDownvote}>
					<UilAngleDown size={24} />
				</button>
			</div>

			{answer?.answerReply?.edges?.map(reply => {
				const { node } = reply;
				return <DiscussionReply node={node} key={node?.id} index={index} />;
			})}
			{showReplyForm && selectedComment === index ? (
				<>
					<AnswerReplyForm
						placeholder='Write a reply'
						answerId={answer.id}
						discussionId={discussionSlug}
					/>
				</>
			) : (
				<>
					<div className='bg-gray-100 flex items-center shadow-sm'>
						<div
							className='bg-gray-200 cursor-pointer mt-2 px-2 py-4 rounded-md w-full'
							onClick={() => handleReplyFormClick(index)}>
							<span className='font-medium'>Write a reply</span>
						</div>
					</div>
				</>
			)}
			<div className='flex justify-end'>
				<button className='mt-5'>Show More</button>
			</div>
		</div>
	);
};
