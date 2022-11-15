import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInput, FormEditor } from '@/shared-components/forms';
import { schema } from './schema';
import { initialValues } from './initialValues';
import { DiscussionFormFields } from './types';

const DiscussionForm = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<DiscussionFormFields>({
		mode: 'onSubmit',
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const onSubmit = handleSubmit(input => {
		console.log('input', input);
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
			</form>
		</>
	);
};

export default DiscussionForm;
