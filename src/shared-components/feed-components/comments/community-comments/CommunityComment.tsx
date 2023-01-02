import { SecondLevelCommentEdge, User } from '@/generated/graphql';
import { CREATE_SECOND_LEVEL_COMMENT } from '@/graphql/community/mutation';
import { GET_SECOND_LEVEL_COMMENTS } from '@/graphql/community/resolver';
import { useSecondLevelCommunityComments } from '@/hooks/services/useSecondLevelCommunityComments';
import { CreatorContainer } from '@/shared-components/creator-container';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { useMutation } from '@apollo/client';
import { Fragment, useState } from 'react';
import { InlinePostForm } from '../../inline-post-form';

type CommunityCommentProps = {
	item: any;
	authorizedUser: User;
	level?: number;
	parentCommentId?: string;
};

const CommunityComment = (props: CommunityCommentProps) => {
	const { item, authorizedUser, level, parentCommentId } = props;
	const [showReplyForm, setShowReplyForm] = useState(false);
	const [createSecondLevelComment, { loading: secondLevelCommentSubmitting }] = useMutation(
		CREATE_SECOND_LEVEL_COMMENT
	);
	const {
		loadSecondLevelComments,
		response: replies,
		loading: repliesLoading,
		hasNextPage,
		onLoadMore,
	} = useSecondLevelCommunityComments(item.id, 5);

	const handleShowReplyForm = () => {
		setShowReplyForm(true);
	};
	const onReplySubmit = async (val: any, cb: any) => {
		await createSecondLevelComment({
			variables: {
				commentId: parentCommentId || item.id,
				input: {
					text: val.reply,
				},
			},
			refetchQueries: [
				{
					query: GET_SECOND_LEVEL_COMMENTS,
					variables: { commentId: parentCommentId || item.id, first: 5 },
				},
			],
			onCompleted() {
				cb();
				setShowReplyForm(false);
			},
		});
	};

	const handleShowReplies = async () => {
		await loadSecondLevelComments({
			variables: {
				commentId: item.id,
				first: 5,
			},
		});
	};
	return (
		<>
			<div className={`${level === 2 ? '' : 'px-14'}`}>
				<div className='flex items-center pt-4'>
					<CreatorContainer
						avatar={item?.creator?.userProfile?.profileImage}
						userName={item?.creator?.username || item.creator?.fullName}
						fullName={item.creator?.fullName}
						createdAt={item.createdAt}
					/>
				</div>
				<div className='ml-16 mt-0'>
					<p className='mt-1 text-gray-600 text-md'>{item.content}</p>
					<button
						className='font-semibold mt-4 text-primary text-xs tracking-wide uppercase'
						onClick={handleShowReplyForm}>
						Reply
					</button>
					{level !== 2 && (
						<button
							className='font-semibold ml-4 mt-2 text-primary text-xs tracking-wide uppercase'
							onClick={handleShowReplies}>
							Replies
						</button>
					)}

					{repliesLoading && <p>Loading...</p>}
					<LoaderDataComponent
						isLoading={repliesLoading}
						data={replies}
						fallback={<p>Loading...</p>}
						emptyComponent={<></>}>
						<InfiniteScroller
							loading={repliesLoading}
							scrollableTop={true}
							hasNextPage={hasNextPage}
							onLoadMore={onLoadMore}>
							{(replies || []).map((secondLevelCommentNode: SecondLevelCommentEdge) => {
								const { node } = secondLevelCommentNode;
								if (node) {
									return (
										<Fragment key={node?.id}>
											<CommunityComment
												key={node?.id}
												item={node}
												authorizedUser={authorizedUser}
												level={2}
												parentCommentId={item.id}
											/>
											<div className='bg-slate-100 h-[1px] mt-4 shadow-sm w-full'></div>
										</Fragment>
									);
								}
							})}
						</InfiniteScroller>
					</LoaderDataComponent>
					{showReplyForm && (
						<div className={`${level === 2 ? '-ml-16' : ''}`}>
							<InlinePostForm
								authorizedUser={authorizedUser}
								name='reply'
								placeholder='write a reply...'
								onFormSubmit={onReplySubmit}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CommunityComment;
