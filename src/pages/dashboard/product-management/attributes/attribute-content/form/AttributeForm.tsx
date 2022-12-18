import { useForm, useFieldArray } from 'react-hook-form';

import { FormInput, FormCheckbox, FormSelect } from '@/shared-components/forms';
import { MinusCircleIcon, PlusCircleIcon } from '@/ui-elements/atoms/icons';

type OptionFields = {
	label: string;
	value: string;
};

export type AttributeFormFields = {
	label: string;
	value: string;
	displayType: 'color' | 'dropdown' | 'list' | 'radio' | 'checkbox';
	hasProductType: boolean;
	hasVariants: boolean;
	options?: OptionFields[];
};

const initialValues = {
	label: 'Size',
	value: 'size',
	displayType: 'dropdown' as const,
	hasProductType: false,
	hasVariants: false,
	options: [
		{ label: '', value: '' },
		{ label: '', value: '' },
	],
};

const OPTIONS = [
	{ id: 1, label: 'Color', value: 'color' },
	{ id: 2, label: 'Dropdown', value: 'dropdown' },
	{ id: 3, label: 'List', value: 'list' },
	{ id: 4, label: 'Radio', value: 'radio' },
	{ id: 5, label: 'Checkbox', value: 'checkbox' },
];

const AttributeForm = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<AttributeFormFields>({
		defaultValues: initialValues ?? {},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'options',
	});

	const onSubmit = handleSubmit(data => {
		console.log('submitting...');
	});
	return (
		<>
			<form onSubmit={onSubmit} className='mt-6'>
				<div className='w-full'>
					<FormCheckbox
						id='hasProductType'
						label='Product Type'
						name='hasProductType'
						register={register}
						inputClassName='mb-4'
						wrapperClassName='mb-6'
						helperText='Attributes is available to all the product that is under this product type'
						errors={errors}
					/>
				</div>
				<div className='flex'>
					<div className='w-full md:mr-4 md:w-4/12'>
						<FormInput<AttributeFormFields>
							id='label'
							type='text'
							name='label'
							label='Name'
							placeholder='Size'
							className='mr-2'
							register={register}
							rules={{ required: 'You must enter the label' }}
							helperText='This is shown to the user'
							errors={errors}
						/>
					</div>
					<div className='w-full md:w-4/12'>
						<FormInput<AttributeFormFields>
							id='value'
							type='text'
							name='value'
							label='Value'
							placeholder='size'
							className='mr-2'
							register={register}
							disabled
							helperText='It is uneditable and is based off of name'
							rules={{ required: 'You must enter the value' }}
							errors={errors}
						/>
					</div>
					<div className='w-full md:w-4/12'></div>
				</div>
				<div className='flex'>
					<div className='mt-4 w-full md:w-4/12'>
						<FormSelect<AttributeFormFields>
							id='displayType'
							type='text'
							name='displayType'
							label='Display type'
							placeholder='Dropdown'
							register={register}
							rules={{ required: 'You must enter the type' }}
							options={OPTIONS}
							control={control}
							helperText='Display type of an attribute'
							errors={errors}
						/>
					</div>
				</div>
				<div className='mt-4 w-full'>
					<FormCheckbox
						id='hasVariants'
						label='Variants'
						name='hasVariants'
						register={register}
						className='my-4'
						helperText='Variants will be generated from this attribute automatically'
						errors={errors}
					/>
				</div>
				<div className='options'>
					<p className='font-semibold my-4 text-lg'>Attribute Options</p>
					{fields.map((field, index) => {
						return (
							<div className='flex' key={field.id}>
								<div className='w-full md:mr-4 md:w-4/12'>
									<FormInput<AttributeFormFields>
										id={`options[${index}].label`}
										name={`options[${index}].label`}
										type='text'
										label={`Label`}
										className='mr-2'
										defaultValue={`${field.label}`}
										register={register}
										errors={errors}
									/>
								</div>
								<div className='w-full md:w-4/12'>
									<FormInput<AttributeFormFields>
										id={`options[${index}].value`}
										name={`options[${index}].value`}
										type='text'
										label={`Value`}
										className='mr-2'
										defaultValue={`${field.value}`}
										register={register}
										errors={errors}
									/>
								</div>
								{fields.length !== index + 1 && (
									<MinusCircleIcon onClick={() => remove(index)} className='mt-8' />
								)}
								{fields.length === index + 1 && (
									<div className='flex w-full md:w-4/12'>
										<PlusCircleIcon onClick={() => append({ label: '', value: '' })} className='mt-8' />
										<MinusCircleIcon onClick={() => remove(index)} className='ml-4 mt-8' />
									</div>
								)}
							</div>
						);
					})}
				</div>

				<button
					className='bg-primary duration-200 font-semibold mt-4 px-4 py-2 rounded shadow-md text-white transform hover:-translate-y-1 hover:text-brandSecondary focus:outline-none focus:translate-y-1 disabled:opacity-50'
					type='submit'>
					Create new attribute
				</button>
			</form>
		</>
	);
};

export default AttributeForm;
