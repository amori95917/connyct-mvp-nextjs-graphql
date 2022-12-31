import { User } from '@/generated/graphql';
import { CreatorContainer } from '@/shared-components/creator-container';
import { useState } from 'react';
import { InlinePostForm } from '../../inline-post-form';

type CommunityCommentProps = {
	items: any;
	authorizedUser: User;
};

const CommunityComment = (props: CommunityCommentProps) => {
	const { items, authorizedUser } = props;
	const [showReplyForm, setShowReplyForm] = useState(false);
	const handleShowReplyForm = () => {
		setShowReplyForm(true);
	};
	const onReplySubmit = (val: any) => {
		console.log('val', val);
	};
	return (
		<>
			<div className='flex items-center pt-4'>
				<CreatorContainer
					avatar={items?.creator?.userProfile?.profileImage}
					userName={items?.creator?.username || items.creator?.fullName}
					fullName={items.creator?.fullName}
					createdAt={items.createdAt}
				/>
			</div>
			<div className='ml-16 mt-2'>
				<p className='mt-2 text-gray-600 text-md'>{items.content}</p>
				<button
					className='font-semibold mt-2 text-primary text-xs tracking-wide uppercase'
					onClick={handleShowReplyForm}>
					Reply
				</button>
				{showReplyForm && (
					<InlinePostForm
						authorizedUser={authorizedUser}
						name='reply'
						placeholder='write a reply...'
						onFormSubmit={onReplySubmit}
					/>
				)}
				<div className='flex item-center reply'></div>
			</div>
		</>
	);
};

export default CommunityComment;
