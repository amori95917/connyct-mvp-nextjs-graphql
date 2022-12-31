import { FirstLevelCommentEdge, User } from '@/generated/graphql';
import { GET_FIRST_LEVEL_COMMENTS } from '@/graphql/community';
import { CREATE_FIRST_LEVEL_COMMENT } from '@/graphql/community/mutation';
import { useGetFirstLevelCommunityPostComments } from '@/hooks/services/useGetFirstLevelCommunityPostComments';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { useMutation } from '@apollo/client';
import { Fragment, useState } from 'react';
import { InlinePostForm } from '../../inline-post-form';
import CommunityComment from './CommunityComment';

type CommunityCommentsProps = {
	authorizedUser: User;
	postId: string;
};

const CommunityComments = (props: CommunityCommentsProps) => {
	const { postId, authorizedUser } = props;
	const [createFirstLevelComment, { loading: firstLevelCommentsubmitting }] = useMutation(
		CREATE_FIRST_LEVEL_COMMENT
	);
	const {
		response: firstLevelComments,
		loading,
		hasNextPage,
		onLoadMore,
	} = useGetFirstLevelCommunityPostComments(postId, 10);
	const [showReplyForm, setShowReplyForm] = useState(false);
	const handleShowReplyForm = () => {
		setShowReplyForm(true);
	};
	const onCommentSubmit = async (value: any, cb: any) => {
		if (value.comment) {
			await createFirstLevelComment({
				variables: {
					postId,
					input: {
						text: value.comment,
					},
				},
				refetchQueries: [{ query: GET_FIRST_LEVEL_COMMENTS, variables: { postId, first: 10 } }],
				onCompleted() {
					cb();
				},
			});
		}
	};

	return (
		<>
			<div className='comment comment-level'>
				<InlinePostForm
					authorizedUser={authorizedUser}
					name='comment'
					placeholder='write a comment...'
					onFormSubmit={onCommentSubmit}
				/>
				{firstLevelComments.length > 0 && (
					<div className='comments'>
						<LoaderDataComponent
							isLoading={loading}
							data={firstLevelComments}
							fallback={<p>Loading...</p>}>
							<InfiniteScroller
								loading={loading}
								scrollableTop={true}
								hasNextPage={hasNextPage}
								onLoadMore={onLoadMore}>
								{(firstLevelComments || []).map((firstLevelCommentNode: FirstLevelCommentEdge) => {
									const { node } = firstLevelCommentNode;
									if (node) {
										return (
											<Fragment key={node?.id}>
												<CommunityComment
													key={node?.id}
													item={node}
													authorizedUser={authorizedUser}
													level={1}
												/>
												<div className='bg-slate-100 h-[1px] mt-4 shadow-sm w-full'></div>
											</Fragment>
										);
									}
								})}
							</InfiniteScroller>
						</LoaderDataComponent>
					</div>
				)}
			</div>
		</>
	);
};

export default CommunityComments;
