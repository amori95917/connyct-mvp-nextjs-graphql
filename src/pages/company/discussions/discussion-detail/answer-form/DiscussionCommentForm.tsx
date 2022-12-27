import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';

import { FormInput, FormEditor } from '@/shared-components/forms';
import { DISCUSSION_POST_ANSWER, GET_DISCUSSION_ANSWER } from '@/graphql/discussion/resolver';
import { schema } from './schema';
import { initialValues } from './initialValues';
import { DiscussionCommentFormFields, DiscussionCommentFormProps } from './types';

// This is discussionAnswer

const DiscussionCommentForm: React.FC<DiscussionCommentFormProps> = ({
	placeholder = 'Write a comment',
	discussionId,
}) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<DiscussionCommentFormFields>({
		mode: 'onSubmit',
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const [discussionAnswer] = useMutation(DISCUSSION_POST_ANSWER);

	const onSubmit = handleSubmit(async input => {
		const { comment, description } = input;
		try {
			await discussionAnswer({
				variables: {
					answer: {
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
				<div className='flex justify-end mt-4 w-full'>
					<button className='bg-primary p-2 rounded-md text-white'>Submit Answer</button>
				</div>
			</form>
		</>
	);
};

export default DiscussionCommentForm;
