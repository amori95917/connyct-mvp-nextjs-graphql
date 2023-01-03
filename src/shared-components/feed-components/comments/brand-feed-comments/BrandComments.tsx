import { PostFirstLevelCommentEdge, User } from '@/generated/graphql';
import { CREATE_POST_FIRST_LEVEL_COMMENT, GET_POST_FIRST_LEVEL_COMMENTS } from '@/graphql/feeds';
import { useCompanyPostFirstLevelComments } from '@/hooks/services/useCompanyPostFirstLevelComments';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { useMutation } from '@apollo/client';
import { Fragment, useState } from 'react';
import { InlinePostForm } from '../../inline-post-form';
import BrandComment from './BrandComment';

type BrandCommentsProps = {
	authorizedUser: User;
	postId: string;
};

const BrandComments = (props: BrandCommentsProps) => {
	const { postId, authorizedUser } = props;
	const [createPostFirstLevelComment, { loading: firstLevelCommentsubmitting }] = useMutation(
		CREATE_POST_FIRST_LEVEL_COMMENT
	);
	const {
		response: firstLevelComments,
		loading,
		hasNextPage,
		onLoadMore,
	} = useCompanyPostFirstLevelComments(postId, 3);
	const [showReplyForm, setShowReplyForm] = useState(false);
	const handleShowReplyForm = () => {
		setShowReplyForm(true);
	};
	const onCommentSubmit = async (value: any, cb: any) => {
		if (value.comment) {
			await createPostFirstLevelComment({
				variables: {
					postId,
					input: {
						content: value.comment,
					},
				},
				refetchQueries: [{ query: GET_POST_FIRST_LEVEL_COMMENTS, variables: { postId, first: 3 } }],
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
								{(firstLevelComments || []).map((firstLevelCommentNode: PostFirstLevelCommentEdge) => {
									const { node } = firstLevelCommentNode;
									if (node) {
										return (
											<Fragment key={node?.id}>
												<BrandComment key={node?.id} item={node} authorizedUser={authorizedUser} level={1} />
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

export default BrandComments;
