import { formatDistance } from 'date-fns';

import { LikeIcon, CommentIcon } from '@/shared-components/icons';
import { ProfilePicture } from '@/shared-components/profile-picture';
import { BaseCommentProps } from './comments.types';

export const BaseComment = ({
	postId = '',
	comment,
	commentType = 'FeedComment',
	commentWrapperCss = '',
	shadowBoxCss = '',
	setActiveComment,
}: BaseCommentProps) => {
	const { id, creator, text, createdAt = new Date() } = comment;
	const commentWrapperStyling = `flex items-center mt-5 ${commentWrapperCss}`;
	const shadowBoxStyling = `grow pt-1 ${shadowBoxCss}`;

	const handleReply = () => {
		// handle mentions from here
		setActiveComment({ id, type: 'replying' });
	};
	return (
		<>
			<div className={commentWrapperStyling} id='comment-wrapper'>
				<div className={shadowBoxStyling} id='shadow-box'>
					<div className='flex flex-col' id='image-text-column'>
						<div className='flex flex-col w-fit' id='profile-text-inline'>
							<div className='flex w-fit'>
								<ProfilePicture profilePicture={'https://i.pravatar.cc'} />
								<div className='flex flex-col'>
									<div>
										<span className='font-bold ml-2'>{creator?.fullName}</span>
										<span className='ml-2 text-gray-400 text-xs'>
											{formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}
										</span>
									</div>
									<p className='flex pl-2 text-gray-600'>{text}</p>
									<div className='comment-actions cursor-pointer flex items-center mt-2 pl-2'>
										<div className='flex items-center pr-4'>
											<LikeIcon width='1.5em' height='1.5em' />
										</div>
										<div className='flex'>
											<button onClick={handleReply}>
												<CommentIcon width='1.5em' height='1.1em' />
											</button>
										</div>
									</div>
								</div>
							</div>
							{/* <div className='bg-slate-100 h-px mb-2 mt-1'></div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
