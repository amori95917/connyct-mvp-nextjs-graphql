import { useState } from 'react';
import { useRouter } from 'next/router';
import { UilAngleDown, UilAngleUp, UilEllipsisV } from '@iconscout/react-unicons';
import parse from 'html-react-parser';

import { useDiscussionAnswersQuery } from '@/hooks/services/useDiscussionAnswerQuery';
import { DiscussionAnswer as DiscussionAnswerType } from '@/generated/graphql';
import { CreatorContainer } from '@/shared-components/creator-container/CreatorContainer';
import { ConferenceIcon } from '@/shared-components/icons';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { DiscussionsLoader } from '@/shared-components/skeleton-loader/DiscussionLoader';
import { EmptyComponent } from '@/ui-elements/atoms/empty-component';

import { DiscussionCommentForm } from './answer-form';
import { DiscussionActionsDropdown } from './drop-down/DiscussionActionsDropdown';
import { DiscussionAnswer } from './discussion-answer/DiscussionAnswer';
import { useDiscussionVote } from '../useDiscussionHooks';

export const DiscussionView = ({ discussion }) => {
	const [showActions, setShowActions] = useState<boolean>();

	const router = useRouter();

	const { discussionSlug } = router.query;
	const { handelVoteUp, handelVoteDown } = useDiscussionVote(discussionSlug);
	const { discussionAnswers, loading } = useDiscussionAnswersQuery(discussionSlug);

	const onActionClickHandler = () => {
		setShowActions(!showActions);
	};

	// TODO: use query to fetch particular discussion even if we don't have data as UI has already been confirmed
	return (
		<div className='bg-white p-5'>
			<div className='flex items-center justify-between'>
				<CreatorContainer
					userName={discussion?.createdBy?.userName || discussion?.createdBy?.fullName}
					fullName={discussion?.createdBy?.fullName}
					createdAt={discussion?.createdAt}
					avatar={discussion.createdBy?.image}
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
			<div className='flex flex-col'>
				<p className='font-2xl font-bold mt-2'>{discussion?.title}</p>
				<div className='mt-5 text-slate-800'>{parse(discussion?.description || '')}</div>
			</div>
			<div className='bg-slate-200 h-px mt-4'></div>
			<div className='flex items-center mt-3 text-gray-600'>
				<button className='mr-1 text-slate-600 hover:text-blue-600' onClick={() => handelVoteUp()}>
					<UilAngleUp size={24} />
				</button>
				<span className='font-semibold text-primary text-xl'>{discussion?.upVote}</span>
				<button className='ml-1 text-slate-600 hover:text-rose-600' onClick={() => handelVoteDown()}>
					<UilAngleDown size={24} />
				</button>
				<p className='ml-2'>{discussionAnswers?.length || 0} comments</p>
				{/* <p className=''>10 replies</p> */}
			</div>

			<LoaderDataComponent
				isLoading={loading}
				data={discussionAnswers}
				fallback={<DiscussionsLoader />}
				emptyComponent={
					<EmptyComponent
						text='There is no answer yet'
						subText='Be the first to answer'
						icon={<ConferenceIcon width='4em' height='4em' className='fill-primary' />}
					/>
				}>
				{discussionAnswers?.map((discussionAnswer: DiscussionAnswerType, index: number) => {
					const { node } = discussionAnswer;
					return <DiscussionAnswer key={index} answer={node} index={index} loading={loading} />;
				})}
			</LoaderDataComponent>
			<DiscussionCommentForm discussionId={discussionSlug} />
		</div>
	);
};
