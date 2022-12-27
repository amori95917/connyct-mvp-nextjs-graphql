import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';

import { FormEditor } from '@/shared-components/forms';
import {
	CREATE_DISCUSSION_ANSWER_REPLY,
	GET_DISCUSSION_ANSWER,
} from '@/graphql/discussion/resolver';
import { schema } from './schema';
import { initialValues } from './initialValues';
import { DiscussionAnswerReplyFormProps, DiscussionAnswerReplyFormFields } from './types';

// This is discussionAnswer

const DiscussionCommentForm: React.FC<DiscussionAnswerReplyFormProps> = ({
	placeholder = 'Write a comment',
	discussionId,
	answerId,
}) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<DiscussionAnswerReplyFormFields>({
		mode: 'onSubmit',
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const [discussionAnswerReply] = useMutation(CREATE_DISCUSSION_ANSWER_REPLY);

	const onSubmit = handleSubmit(async input => {
		const { description } = input;
		try {
			await discussionAnswerReply({
				variables: {
					input: {
						repliedToAnswerId: answerId,
						answer: description,
						discussionId,
					},
				},
				refetchQueries: [{ query: GET_DISCUSSION_ANSWER, variables: { discussionId, first: 10 } }],
			});
		} catch (e) {
			console.error(new Error(e as string));
		}
	});

	return (
		<>
			<form onSubmit={onSubmit} className='md:px-3'>
				<div className='w-full md:pt-6'>
					<FormEditor
						id='description'
						name={`description`}
						label=''
						placeholder={placeholder}
						control={control}
						errors={errors}
					/>
				</div>
				<div className='flex justify-end w-full'>
					<button type='submit' className='bg-primary mt-2 p-2 rounded-md text-white'>
						Post Reply
					</button>
				</div>
			</form>
		</>
	);
};

export default DiscussionCommentForm;
