import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInput, FormRadio } from '@/shared-components/forms';
import { schema } from './schema';
import { initialValues } from './initialValues';
import { CommunityFormFields } from './types';

const CommunityForm = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CommunityFormFields>({
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
				<p className='font-semibold mb-10 text-gray-600 text-xl'>Create a new community</p>
				<div className='w-full'>
					<FormInput
						name={`name`}
						id='name'
						label='Name*'
						className='pr-5'
						placeholder='Name of a community'
						register={register}
						errors={errors}
					/>
				</div>
				<p className='font-semibold mb-4 text-grey-600'>Community Privacy</p>
				<div className='flex mb-5'>
					<div className='w-1/2'>
						<FormRadio
							id='private'
							name='communityPrivacyType'
							value='private'
							label='Private'
							className='mr-2'
							inputClassName='bg-gray-200'
							register={register}
							errors={errors}
							helperText='Only member given access can join.'
						/>
					</div>
					<div className='w-1/2'>
						<FormRadio
							id='public'
							name='communityPrivacyType'
							value='public'
							label='Public'
							className='mr-2'
							inputClassName='bg-gray-200'
							register={register}
							errors={errors}
							helperText='Any of your follower can join this community.'
						/>
					</div>
				</div>
			</form>
		</>
	);
};

export default CommunityForm;
