import React from 'react';
import Image from 'next/image';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineSend } from 'react-icons/ai';
import * as yup from 'yup';
import produce from 'immer';

import { GET_COMMENTS, CREATE_COMMENT_REPLY } from '@/graphql/feeds';
import { FormInput } from '@/components/molecules/forms';

type commentFormFields = {
	postReply: string;
};

const schema = yup.object({
	postReply: yup.string().required(''),
});

type createCommentReplyType = {
	postId: string;
	commentId: string;
};

const ReplyComment = React.forwardRef(({ postId, commentId }: createCommentReplyType, ref) => {
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<commentFormFields>({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	});
	const [commentReply] = useMutation(CREATE_COMMENT_REPLY);

	const onSubmit = handleSubmit(async input => {
		try {
			const response = await commentReply({
				variables: {
					commentId,
					input: {
						text: input.postReply,
					},
				},
				update: (cache, { data: { commentReply } }) => {
					const commentPost = cache.readQuery({
						query: GET_COMMENTS,
						variables: { postId, first: 3 },
					});
					console.log('commentReply', commentReply);
					console.log('commentPost', commentPost);
					const updatedComment = produce(commentPost, (draft: any) => {
						if (draft?.comments?.comments.edges) {
							console.log('JSON', JSON.parse(JSON.stringify(draft?.comments?.comments)));
							const commentToUpdate = draft.comments.comments.edges.find(
								commentEdge => commentEdge.node.id === commentId
							);
							console.log('commentToUpdate', JSON.parse(JSON.stringify(commentToUpdate)));
							commentToUpdate.node.replies.edges.push({
								__typename: 'RepliesEdge',
								cursor: commentReply.replies.id,
								node: { ...commentReply.replies },
							});
						}
					});
					console.log('updatedComment', updatedComment);
					// const updatedComment = {
					// 	...commentPost,
					// 	comments: {
					// 		...commentPost.comments,
					// 		comments: {
					// 			...commentPost.comments.comments,
					// 			nodes: commentPost.comments.comments.nodes.map(commentNode => {
					// 				if (commentNode.id === commentId) {
					// 					return { ...commentNode, replies: {...commentNode.replies, nodes: [...commentNode.replies.nodes, commentReply.replies]} };
					// 				} else {
					// 					return commentNode;
					// 				}
					// 			}),
					// 		},
					// 	},
					// };
					// const updatedComment = {
					// 	getComments: [{ commentReply }, ...commentPost.getComments.nodes],
					// };
					cache.writeQuery({
						query: GET_COMMENTS,
						variables: { postId, first: 3 },
						data: updatedComment,
					});
				},
			});
			reset();
		} catch (err) {
			console.log(err);
		}
	});

	return (
		<>
			{/* <div className='bg-slate-300 h-px mt-2 w-full'></div> */}
			<div ref={ref} className='flex mt-2 pr-3 rounded-full w-full'>
				<div className='flex h-10 mt-0 w-10'>
					<Image
						className='rounded-full'
						width={52}
						height={52}
						src='https://i.pravatar.cc'
						alt='Sunset in the mountains'
					/>
				</div>

				<form onSubmit={onSubmit} className='flex rounded-md w-full'>
					<div className='flex items-center ml-3 rounded-md w-full'>
						<FormInput
							name='postReply'
							id='comment'
							type='text'
							atomClassName='bg-slate-100 h-10 w-full rounded-md'
							className='w-full'
							register={register}
							errors={errors}
							placeholder={'Say something that inspires'}
						/>
						{/* <input className='bg-slate-100 flex h-12 ml-2 w-full' placeholder='write comment here' /> */}
					</div>
					<button
						type='submit'
						className='bg-slate-100 h-10 ml-2 p-2 rounded-md w-10 hover:bg-slate-200'>
						<AiOutlineSend fill='#2599c0' size={25} />
					</button>
				</form>
			</div>
			{/* <div className='bg-slate-300 h-px mt-2'></div> */}
		</>
	);
});

ReplyComment.displayName = 'ReplyComment';
export default ReplyComment;
