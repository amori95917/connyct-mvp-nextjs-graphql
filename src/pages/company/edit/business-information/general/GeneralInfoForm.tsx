import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { FormInput, FormRadio, FormEditor, FormSelect } from '@/shared-components/forms';
import { COMPANY_GENERAL_EDIT, GET_COMPANY } from '@/graphql/company/resolver';
import { COMPANY_STAGE } from '@/constants/select';
import { GeneralFormFields } from '../types';
import { generalFromInitialValues } from '../initialValues';
import { generalFormValidationSchema } from '../validationSchema';

// const disabledButtonClass =
// 	'bg-gray-300 block font-semibold  px-3 py-3 rounded-lg hover:cursor-not-allowed text-white ';

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
		mode: 'onSubmit',
		defaultValues: generalFromInitialValues(data.getCompanyById) ?? {},
		resolver: yupResolver(generalFormValidationSchema),
	});

	const [generalEdit, { loading, error }] = useMutation(COMPANY_GENERAL_EDIT);

	const onSubmit = handleSubmit(async input => {
		const { companyStage, ...restInput } = input;

		try {
			const response = await generalEdit({
				variables: {
					companyId: companySlug,
					data: {
						...restInput,
						companyStage: companyStage?.value,
					},
				},
				refetchQueries: [{ query: GET_COMPANY, variables: { id: companySlug } }],
			});

			if (response?.data) {
				console.log(response);
				router.push(`/brand/${companySlug}/edit/business-information/documents`);
			}
		} catch (err: any) {
			console.log(err);
		}

		if (submitCompletedRoute?.includes('general')) {
			setSubmitCompletedRoute((prevState: string[]) => [...prevState, 'general']);
		}
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
						disabled={true}
						register={register}
						errors={errors}
					/>
				</div>

				<div className='mt-3'>
					<div className='w-full md:pt-6'>
						<FormEditor
							id='description'
							name={`description`}
							label='Description'
							placeholder={'Write description about your company'}
							helperText={'Short description of what your business does.'}
							control={control}
							errors={errors}
						/>
					</div>
					<label className='block font-bold mb-2 mt-5 text-gray-700 text-sm tracking-wide uppercase'>
						Registration Type*
					</label>
					<div className='flex gap-3 justify-between'>
						<FormRadio
							id='pan'
							name='registrationNumberType'
							value={'PAN'}
							label='PAN'
							className='mr-2'
							labelClassName='mb-0'
							inputClassName='bg-gray-200 '
							register={register}
							errors={errors}
						/>
						<FormRadio
							id='vat'
							name='registrationNumberType'
							value={'VAT'}
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
				<div className='mt-5 pr-2 w-full'>
					<FormSelect
						id='companyStage'
						name='companyStage'
						label='Company Stage'
						placeholder='Company Stage'
						setValue={setValue}
						options={COMPANY_STAGE}
						helperText=''
						control={control}
					/>
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
				<div className='flex gap-2 justify-end mb-5 mt-4 w-full'>
					<button type='submit' className={buttonClass}>
						Continue
					</button>
				</div>
			</form>
		</>
	);
};

export default GeneralInfoForm;
