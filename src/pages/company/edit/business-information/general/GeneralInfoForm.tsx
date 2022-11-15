import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInput, FormRadio } from '@/shared-components/forms';
import { GeneralFormFields } from '../types';
import { generalFromInitialValues } from '../initialValues';
import { generalFormValidationSchema } from '../validationSchema';
import { FormSelect } from '@/ui-elements/molecules/forms/selectv2';
import { COMPANY_STAGE } from '@/constants/select';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';

const disabledButtonClass =
	'bg-gray-300 block font-semibold  px-3 py-3 rounded-lg hover:cursor-not-allowed text-white ';

const buttonClass =
	'bg-primary block font-semibold  px-3 py-3 rounded-lg text-white  hover:bg-primary focus:bg-primary';

const GeneralInfoForm = props => {
	const { data, submitCompletedRoute, setSubmitCompletedRoute, companySlug } = props;

	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm<GeneralFormFields>({
		// mode: 'onSubmit',
		defaultValues: generalFromInitialValues(data.getCompanyById) ?? {},
		resolver: yupResolver(generalFormValidationSchema),
	});

	const onSubmit = handleSubmit(async input => {
		if (!submitCompletedRoute.includes('general')) {
			setSubmitCompletedRoute((prevState: string[]) => [...prevState, 'general']);
		}

		router.push(`/company/${companySlug}/edit/business-information/documents`);
	});
	return (
		<>
			<form onSubmit={onSubmit}>
				<p className='font-semibold mb-4 text-xl'>General</p>
				<div className='flex gap-3 justify-between'>
					<FormInput
						id='name'
						type='text'
						name='name'
						label='Name*'
						helperText='Name will be used for presenting your company profile.'
						placeholder='Name'
						className='mb-2 mr-2'
						register={register}
						errors={errors}
					/>
					<FormInput
						id='legalName'
						type='text'
						name='legalName'
						helperText='Legal name is used for legal verification of your company.'
						label='Legal Name*'
						placeholder='Legal Name'
						className='grow mr-2'
						register={register}
						errors={errors}
					/>
				</div>
				<div className='mt-3'>
					<FormInput
						id='description'
						type='text'
						name='description'
						label='Description'
						helperText='Short description of what your business does.'
						placeholder='Write a description about product'
						className='mr-2'
						register={register}
						errors={errors}
					/>
					<label className='block font-bold mb-2 mt-5 text-gray-700 text-sm tracking-wide uppercase'>
						Registration Type*
					</label>
					<div className='flex gap-3 justify-between'>
						<FormRadio
							id='pan'
							name='registrationType'
							value={'pan'}
							label='PAN'
							className='mr-2'
							labelClassName='mb-0'
							inputClassName='bg-gray-200 '
							register={register}
							errors={errors}
						/>
						<FormRadio
							id='registration-type'
							name='registrationType'
							value={'vat'}
							label='VAT'
							className='mr-2'
							labelClassName='mb-0'
							inputClassName='bg-gray-200'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='flex gap-3 justify-between mt-4'>
						<FormInput
							id='registration'
							type='text'
							name='registrationNumber'
							helperText='Registration number of your company.'
							label='Registration Number*'
							placeholder='PAN number or VAT number'
							className='mr-2 mt-6'
							register={register}
							errors={errors}
						/>
						<FormInput
							name='establishedDate'
							id='established-date'
							label='Established Date*'
							type='date'
							className='mt-5 p-0'
							helperText=''
							max={new Date().toISOString().split('T')[0]}
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='mb-2 mt-4 w-full'>
					<FormInput
						name='slogan'
						id='slogan-id'
						label='slogan'
						type='text'
						placeholder='Slogan of the company'
						className='mt-5 p-0'
						register={register}
						errors={errors}
					/>
				</div>

				<div className='pr-2 w-full'>
					<FormSelect
						name='companyStage'
						label='Company Stage'
						placeholder='Company Stage'
						options={COMPANY_STAGE}
						helperText=''
						setValue={setValue}
						errors={errors}
						register={register}
						control={control}
					/>
				</div>

				<div className='flex gap-2 justify-end mb-5 mt-4 w-full'>
					<button type='button' className={disabledButtonClass}>
						Previous
					</button>
					<button type='submit' className={buttonClass}>
						Continue
					</button>
				</div>
			</form>
		</>
	);
};

export default GeneralInfoForm;
