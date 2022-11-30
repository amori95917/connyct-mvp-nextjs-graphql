import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInput, FormRadio, FormSelect } from '@/shared-components/forms';
import {
	COMPANY_BRANCH_CREATE_MUTATION,
	COMPANY_BRANCH_EDIT_MUTATION,
	GET_BRANCH_BY_COMPANY_ID,
} from '@/graphql/company/resolver';
import COUNTRIES from '@/constants/countries.json';
import { schema } from './schema';
import { initialValues } from './initialValues';
import { BranchFormFields } from './types';
import { buttonClass } from '../../common/constants';

const BranchForm = ({
	companySlug,
	isOpen,
	setIsOpen,
	currentBranch,
}: {
	companySlug: string | undefined;
}) => {
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<BranchFormFields>({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		reset(initialValues(currentBranch));
	}, [currentBranch]);

	const [editBranch, { loading: editLoading, error: editError }] = useMutation(
		COMPANY_BRANCH_EDIT_MUTATION
	);
	const [createBranch, { loading: createLoading, error: createError }] = useMutation(
		COMPANY_BRANCH_CREATE_MUTATION
	);

	const onSubmit = handleSubmit(async input => {
		const { branchName: name, zipcode: zipCode, email, country, phoneNumber, ...restInput } = input;

		console.log(currentBranch?.id, 'branch id');
		try {
			if (currentBranch?.id) {
				const response = await editBranch({
					variables: {
						id: currentBranch.id,
						data: {
							country: country?.value,
							contactNumber: phoneNumber,
							contactEmail: email,
							zipCode,
							...restInput,
						},
					},
					refetchQueries: [{ query: GET_BRANCH_BY_COMPANY_ID, variables: { id: companySlug } }],
				});
				if (response?.data) {
					setIsOpen(!isOpen);
				}
			} else {
				const response = await createBranch({
					variables: {
						id: companySlug,
						data: {
							country: country?.value,
							contactNumber: phoneNumber,
							contactEmail: email,
							zipCode,
							...restInput,
						},
					},
					refetchQueries: [{ query: GET_BRANCH_BY_COMPANY_ID, variables: { id: companySlug } }],
				});
				if (response?.data) {
					setIsOpen(!isOpen);
				}
			}
		} catch (err: any) {
			console.log(err);
		}
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
									value={'HEADQUARTER'}
									label='HQ'
									className='mr-2'
									labelClassName='mb-0'
									inputClassName='bg-gray-200'
									register={register}
									errors={errors}
								/>
							</div>
							<div className='flex items-center px-3 w-1/2'>
								<FormRadio
									id='branch'
									name='type'
									value={'BRANCH_OFFICE'}
									label='Branch'
									className='mr-2'
									labelClassName='mb-0'
									inputClassName='bg-gray-200'
									register={register}
									errors={errors}
								/>
							</div>
						</div>
					</div>
					<div className='px-3'>
						<FormSelect
							disabled={true}
							id='country'
							name='country'
							label='Country*'
							placeholder='Country'
							options={COUNTRIES}
							control={control}
						/>
					</div>
					<div className='px-3'>
						<FormInput
							name={`branchName`}
							id='branch-id'
							label='Branch Name'
							className='mt-5 pr-5'
							placeholder='Branch Name'
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
				<div className='flex px-3'>
					<FormInput
						name={`street`}
						id='street-id'
						label='Street'
						className='mr-5 pr-5'
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
