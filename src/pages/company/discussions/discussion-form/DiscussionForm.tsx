import { useForm } from 'react-hook-form';
import produce from 'immer';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';

import { CREATE_DISCUSSION } from '@/graphql/discussion';
import { FormInput, FormEditor } from '@/shared-components/forms';
import { schema } from './schema';
import { initialValues } from './initialValues';
import { DiscussionFormFields } from './types';
import { GET_DISCUSSION } from '@/graphql/discussion/resolver';

const DiscussionForm = ({
	companySlug,
	setIsOpen,
}: {
	companySlug: string;
	setIsOpen: (prevState: boolean) => void;
}) => {
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors, touchedFields },
	} = useForm<DiscussionFormFields>({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const [createDiscussion, { loading }] = useMutation(CREATE_DISCUSSION);

	const onSubmit = handleSubmit(async input => {
		try {
			const response = await createDiscussion({
				variables: {
					input: { ...input, companyId: companySlug },
				},
				update: (cache, { data: { companyDiscussion } }) => {
					const discussionQuery: any = cache.readQuery({
						query: GET_DISCUSSION,
						variables: { companyId: companySlug, first: 10 },
					});

					// TODO need to correct this cache update of discussion

					const updatedDiscussion = produce(discussionQuery, (draft: any) => {
						if (draft?.getCompanyDiscussion) {
							draft.getCompanyDiscussion.edges.push({
								...draft.getCompanyDiscussion.edges.node,
							});
						}
					});
					cache.writeQuery({
						query: GET_DISCUSSION,
						variables: {
							companyId: companySlug,
							first: 10,
						},
						data: updatedDiscussion,
					});
				},
			});

			if (response) {
				setIsOpen(false);
				reset();
			}
		} catch (e) {
			console.log(e, '####');
		}
	});

	return (
		<>
			<form onSubmit={onSubmit} className='md:px-3'>
				<p className='font-semibold mb-10 text-gray-600 text-xl'>Start a new discussion</p>
				<div className='w-full'>
					<FormInput
						name={`title`}
						id='title'
						label='Title*'
						className='pr-5'
						placeholder='Title'
						register={register}
						errors={errors}
					/>
				</div>
				<div className='w-full md:pt-6'>
					<FormEditor
						id='description'
						name={`description`}
						label='Description*'
						placeholder='Write a description'
						control={control}
						errors={errors}
					/>
				</div>
				<div className='absolute bottom-10 flex justify-center pr-5 w-11/12'>
					<button className='bg-primary p-3 rounded-md text-white text-xl w-full'>
						Submit Discussion
					</button>
				</div>
			</form>
		</>
	);
};

export default DiscussionForm;
