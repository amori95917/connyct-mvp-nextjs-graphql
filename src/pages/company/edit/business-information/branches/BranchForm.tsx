import React from 'react';
import { useForm } from 'react-hook-form';

import { FormInput, FormRadio } from '@/shared-components/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { initialValues } from './initialValues';
import { BranchFormFields } from './types';
import { buttonClass } from '../../common/constants';

const BranchForm = () => {
	const {
		register,
		control,
		watch,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<BranchFormFields>({
		mode: 'onSubmit',
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const onSubmit = handleSubmit(input => {
		console.log('input', input);
	});

	return (
		<>
			<p className='font-semibold text-gray-600 text-lg'>Add New Branch</p>
			<form onSubmit={onSubmit}>
				<div>
					<div className='flex flex-col pl-5 pt-1 w-64'>
						<label className='block font-semibold mb-2 mt-5 text-gray-700 text-sm tracking-wide uppercase'>
							Office Type*
						</label>
						<div className='flex mb-5'>
							<div className='flex items-center w-1/2'>
								<FormRadio
									id='headquarter'
									name='type'
									value={'headquarter'}
									label='HQ'
									className='mr-2'
									inputClassName='bg-gray-200'
									register={register}
									errors={errors}
								/>
							</div>
							<div className='flex items-center px-3 w-1/2'>
								<FormRadio
									id='branch'
									name='type'
									value={'branch'}
									label='Branch'
									className='mr-2'
									inputClassName='bg-gray-200'
									register={register}
									errors={errors}
								/>
							</div>
						</div>
					</div>
					<div className='px-3'>
						<FormInput
							name={`country`}
							id='country-id'
							label='Country*'
							className='mt-5 pr-5'
							placeholder='Country'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='flex'>
					<div className='px-3 w-full'>
						<FormInput
							name={`zipcode`}
							id='zipcode-id'
							label='Zipcode*'
							className='pr-5'
							placeholder='zipcode'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='px-3 w-full'>
						<FormInput
							name={`state`}
							id='state-id'
							label='State*'
							className='pr-5'
							placeholder='State'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='px-3'>
					<FormInput
						name={`city`}
						id='city-id'
						label='City*'
						className='pr-5'
						placeholder='City'
						register={register}
						errors={errors}
					/>
				</div>
				<div className='px-3'>
					<FormInput
						name={`street`}
						id='street-id'
						label='Street'
						className='pr-5'
						placeholder='Street'
						register={register}
						errors={errors}
					/>
				</div>
				<div className='px-3'>
					<FormInput
						type='email'
						name={`email`}
						id='email'
						label='Email'
						className='pr-5'
						placeholder='Email'
						register={register}
						errors={errors}
					/>
				</div>
				<div className='px-3'>
					<FormInput
						type='text'
						name={`phoneNumber`}
						id='phoneNumber'
						label='Phone Number'
						className='pr-5'
						placeholder='Phone Number'
						register={register}
						errors={errors}
					/>
				</div>
				<div className='flex gap-2 justify-end mb-5 mt-4 pr-2 w-full'>
					<button className={buttonClass}>Submit</button>
				</div>
			</form>
		</>
	);
};

export default BranchForm;
