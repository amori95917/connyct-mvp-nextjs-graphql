import Image from 'next/image';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { UilMessage } from '@iconscout/react-unicons';
import produce from 'immer';

import { CREATE_COMMENT_FEED } from '@/graphql/feeds';
import { FormInput } from '@/shared-components/forms';
import { GET_COMMENTS } from '@/graphql/feeds';

type commentFormFields = {
	createComment: string;
};

type commentPost = {
	postId: string;
};

const CreateComment = ({ postId }: commentPost) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<commentFormFields>({});

	const [createComment] = useMutation(CREATE_COMMENT_FEED);

	const onSubmit = handleSubmit(async input => {
		if (!!input.createComment) {
			try {
				await createComment({
					variables: {
						postId,
						data: {
							text: input.createComment,
						},
					},
					update: (cache, { data: { commentToPost } }) => {
						const commentPost: any = cache.readQuery({
							query: GET_COMMENTS,
							variables: { postId, first: 3 },
						});
						const updatedComment = produce(commentPost, (draft: any) => {
							if (draft?.comments?.comments.edges) {
								draft.comments.comments.edges.push({
									__typename: 'CommentEdge',
									cursor: commentToPost.comment.id,
									node: { ...commentToPost },
								});
							}
						});
						cache.writeQuery({
							query: GET_COMMENTS,
							variables: { postId, first: commentPost?.comments.comments.edges.length + 1 },
							data: updatedComment,
						});
					},
				});
				reset();
			} catch (err) {
				console.log(err, 'error commentingggggg');
			}
		}
	});

	return (
		<>
			<div className='bg-slate-100 h-px mt-2 w-full'></div>
			<div className='flex mt-2 pr-3 rounded-full w-full'>
				<div className='flex h-12 mt-0 w-12'>
					<Image
						className='rounded-full'
						width={56}
						height={56}
						src='https://i.pravatar.cc'
						alt='Sunset in the mountains'
					/>
				</div>

				<form onSubmit={onSubmit} className='flex rounded-md w-full'>
					<div className='flex items-center ml-3 rounded-md w-full'>
						<FormInput
							name='createComment'
							id='comment'
							type='text'
							atomClassName='bg-slate-100 w-full rounded-md'
							className='w-full'
							placeholder={'Say something that inspires'}
							register={register}
							errors={errors}
						/>
						{/* <input className='bg-slate-100 flex h-12 ml-2 w-full' placeholder='write comment here' /> */}
					</div>
					<button type='submit' className='bg-slate-100 h-12 ml-2 p-2 rounded-md hover:bg-slate-200'>
						<UilMessage fill='#2599c0' size={30} />
					</button>
				</form>
			</div>
		</>
	);
};

export default CreateComment;
