import { LikeIcon, ShareIcon, CommentIcon } from '@/shared-components/icons';
// import { Reaction } from '@/shared-components/reactions';
import { useState } from 'react';

type FeedActionProps = {
	postId?: string;
	likesData: any;
	onCommentClickHandler: () => void;
	commentLength: number;
	isOnSale?: boolean;
};

const FeedActions = (props: FeedActionProps) => {
	const { postId, likesData, commentLength, isOnSale = false, onCommentClickHandler } = props;
	const [showHideReaction, setShowHideReaction] = useState(false);
	const handleReactionClick = () => {
		setShowHideReaction(!showHideReaction);
	};
	return (
		<div className='overflow-scroll'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center relative'>
					<span
						className='cursor-pointer flex items-center whitespace-nowrap'
						onClick={handleReactionClick}
					>
						{/* {showHideReaction && <Reaction postId={postId} />} */}
						<LikeIcon />
						<span className='ml-2 text-muted'>
							Liked by {likesData?.getLikesByPost?.totalCount} <b></b>
						</span>
					</span>
				</div>
				<div className='flex items-center'>
					<button className='flex items-center whitespace-nowrap' onClick={onCommentClickHandler}>
						<CommentIcon />
						<span className='ml-2 text-muted'> comments {commentLength}</span>
					</button>
				</div>
				<div className='flex items-center'>
					<ShareIcon />
					<span className='ml-2 text-muted'>shared</span>
				</div>
				{/* {isOnSale && (
					<button className='bg-primary font-semibold p-2 rounded-md text-white w-30'>Buy Now</button>
				)} */}
			</div>
		</div>
	);
};

export default FeedActions;
