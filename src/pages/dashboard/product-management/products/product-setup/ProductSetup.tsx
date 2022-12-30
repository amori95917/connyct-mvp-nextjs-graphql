import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import { FormInput, FormCheckbox, FormSelect } from '@/shared-components/forms';
import VariationPreview from './VariationPreview';

type Attributes = {
	id: string;
	values: Array<string>;
};

type Pricing = {
	price: string;
	comparePrice: string;
	costPrice: string;
	isTaxable: boolean;
};

type Inventory = {
	sku: string;
	barcode: string;
	trackQuantity: boolean;
	quantity: number;
};

export type ProductFormFields = {
	name: string;
	description: string;
	productType: string;
	categories: Array<string>;
	collections: Array<string>;
	tags: Array<string>;
	pricing: Pricing;
	inventory: Inventory;
	hasVariants: boolean;
	variations: any;
	attribtues?: Attributes[];
	status: 'active' | 'draft';
};

const initialValues = {
	name: '',
	description: '',
	productType: { label: 'Clothing', value: 'clothing' },
	collections: [],
	tags: [],
	pricing: {
		price: '',
		comparePrice: '',
		costPrice: '',
		isTaxable: false,
	},
	inventory: {
		sku: '',
		barcode: '',
		trackQuantity: false,
		quantity: 0,
	},
	hasVariants: false,
	variations: [
		{
			id: 1,
			option: 'Size',
			values: [
				{ id: 1, label: 'SM', value: 'sm' },
				{ id: 2, label: 'MD', value: 'md' },
			],
		},
		{
			id: 2,
			option: 'Color',
			values: [
				{ id: 1, label: 'Red', value: 'red' },
				{ id: 2, label: 'Blue', value: 'blue' },
			],
		},
	],
	// variations: [{ id: 1, option: 'size', value: ['sm', 'md']}, {id: 2, option: 'color', value: ['Red', 'Green', 'Blue']}],
	attributes: [],
	status: 'draft' as const,
};

const ProductSetup = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		watch,
		getValues,
	} = useForm<ProductFormFields>({
		defaultValues: initialValues ?? {},
	});

	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'variations', // unique name for your Field Array
	});

	const onSubmit = handleSubmit(data => {
		console.log('submitting...');
	});

	const hasVariants = watch('hasVariants');
	return (
		<>
			{/* <h1 className="font-semibold text-lg">Product Setup</h1> */}
			<form onSubmit={onSubmit} className='flex mt-6'>
				<div className='w-full md:mr-8 md:w-6/12'>
					<div className='bg-white p-4 shadow-md md:mb-8'>
						<p className='font-semibold mb-4 text-lg'>Basic Information</p>
						<FormInput<ProductFormFields>
							id='name'
							type='text'
							name='name'
							label='Name'
							placeholder='Name'
							className='mb-4 mr-2'
							register={register}
							rules={{ required: 'You must enter the label' }}
							errors={errors}
						/>
						<FormInput<ProductFormFields>
							id='description'
							type='text'
							name='description'
							label='Description'
							placeholder='Write a description about product'
							className='mr-2'
							register={register}
							rules={{ required: 'You must enter the description' }}
							errors={errors}
						/>
					</div>
					<div className='bg-white p-4 shadow-md md:mb-8'>
						<p className='font-semibold mb-4 text-lg'>Pricing</p>
						<div className='flex'>
							<div className='w-full md:w-6/12'>
								<FormInput<ProductFormFields>
									id='price'
									type='text'
									name='pricing.price'
									label='Price'
									placeholder='Price of product'
									className='mr-2'
									register={register}
									rules={{ required: 'You must enter the price' }}
									errors={errors}
								/>
							</div>
							<div className='w-full md:w-6/12'>
								<FormInput<ProductFormFields>
									id='comparePrice'
									type='text'
									name='pricing.comparePrice'
									label='Compare Price'
									placeholder='Compare price of product'
									className='mr-2'
									register={register}
									rules={{ required: 'You must enter the compare price' }}
									helperText="To show a reduced price, move the product's original price into Compare at price. Enter a lower value into Price."
									errors={errors}
								/>
							</div>
						</div>
						<div className='flex'>
							<div className='w-full md:w-6/12'>
								<FormInput<ProductFormFields>
									id='costPrice'
									type='text'
									name='pricing.costPrice'
									label='Cost price per item'
									placeholder='Cost price of product'
									className='mr-2'
									register={register}
									rules={{ required: 'You must enter the cost price' }}
									errors={errors}
								/>
							</div>
						</div>
					</div>
					<div className='bg-white p-4 shadow-md md:mb-8'>
						<p className='font-semibold mb-4 text-lg'>Inventory</p>
						<div className='flex'>
							<div className='w-full md:w-6/12'>
								<FormInput<ProductFormFields>
									id='sku'
									type='text'
									name='inventory.sku'
									label='SKU (Stock Keeping Unit)'
									placeholder='SKU of product'
									className='mr-2'
									register={register}
									rules={{ required: 'You must enter the sku' }}
									errors={errors}
								/>
							</div>
							<div className='w-full md:w-6/12'>
								<FormInput<ProductFormFields>
									id='barcode'
									type='text'
									name='inventory.barcode'
									label='Barcode (ISBN, UPC, GTIN, etc)'
									placeholder='Barcode of product'
									className='mr-2'
									register={register}
									rules={{ required: 'You must enter the barcode' }}
									errors={errors}
								/>
							</div>
						</div>
						<div className='flex'>
							<div className='w-full md:w-6/12'>
								<FormCheckbox<ProductFormFields>
									id='trackQuantity'
									name='inventory.trackQuantity'
									label='Track quantity'
									className='mb-4 mr-2'
									register={register}
									errors={errors}
								/>
							</div>
						</div>
						<div className='flex'>
							<div className='w-full md:w-6/12'>
								<FormInput<ProductFormFields>
									id='quantity'
									type='text'
									name='inventory.quantity'
									label='Quantity'
									placeholder='Quantity of product'
									className='mr-2'
									register={register}
									errors={errors}
								/>
							</div>
						</div>
					</div>
					<div className='bg-white p-4 shadow-md md:mb-8'>
						<p className='font-semibold mb-4 text-lg'>Variants</p>
						<div className='w-full'>
							<FormCheckbox<ProductFormFields>
								id='hasVariants'
								name='hasVariants'
								label='This product has multiple options'
								className='mb-4 mr-2'
								register={register}
								errors={errors}
							/>
						</div>
						<div className='divide-y-2'></div>
						{hasVariants && (
							<>
								<p className='font-semibold mb-4 text-md'>Options</p>
								{fields.map((field, index) => {
									return (
										<React.Fragment key={field.id}>
											<div className='flex mb-4' key={field.id}>
												<div className='w-full md:w-4/12'>
													<FormInput<ProductFormFields>
														id='option'
														type='text'
														name={`variations.${index}.option`}
														label='Option'
														helperText='Choose option that can be applied as variants for a product'
														errors={errors}
														register={register}
													/>
												</div>
												<div className='w-full md:ml-4 md:w-8/12'>
													<FormSelect
														name={`variations.${index}.values`}
														label=''
														placeholder='Choose value'
														options={[]}
														helperText='You can choose multiple values'
														wrapperClassName='mt-7'
														errors={errors}
														register={register}
														isCreateable
														defaultValue={[getValues(`variations.${index}.values`)]}
														control={control}
													/>
													<p onClick={() => remove(index)}>Delete</p>
												</div>
											</div>
										</React.Fragment>
									);
								})}
								<button
									className='bg-gray-200 p-3'
									type='button'
									onClick={() => append({ option: '', value: '' })}
								>
									Add option
								</button>
								<div className='divide-y'></div>
								{/* PREVIEW */}
								{/* <VariationPreview variations={[{ id: 1, option: 'size', values: ['sm', 'md']}, {id: 2, option: 'color', values: ['Red', 'Green', 'Blue']}]}/> */}
								<VariationPreview variations={watch('variations')} />
							</>
						)}
					</div>
				</div>
				<div className='w-full md:w-4/12'>
					<div className='bg-white p-4 shadow-md md:mb-8'>
						<FormSelect
							name='status'
							label='Product Status'
							placeholder='Product status'
							options={STATUS}
							helperText='This product will be hidden from all sales channels.'
							errors={errors}
							register={register}
							control={control}
						/>
					</div>
					<div className='bg-white p-4 shadow-md'>
						<h1 className='font-semibold mb-6 text-lg'>Organize Product</h1>
						<FormSelect
							name='productType'
							label='Product Type'
							placeholder='Product Type'
							options={PRODUCT_TYPE_OPTIONS}
							helperText='Product type of an product. For e.g Clothing'
							errors={errors}
							register={register}
							wrapperClassName='mb-8'
							control={control}
						/>
						<FormSelect
							name='categories'
							label='Category'
							placeholder='Category'
							options={CATEGORIES}
							helperText='Category of a product. For e.g Men'
							errors={errors}
							register={register}
							wrapperClassName='mb-8'
							control={control}
						/>
						<FormSelect
							name='collections'
							label='Collection'
							placeholder='Collection'
							options={COLLECTIONS}
							helperText='Collection of a product. For e.g Winter Collection'
							errors={errors}
							register={register}
							wrapperClassName='mb-8'
							control={control}
						/>
						<FormSelect
							name='tags'
							label='Tags'
							placeholder='Tags'
							options={[]}
							helperText='Tags of a product.'
							errors={errors}
							register={register}
							control={control}
						/>
					</div>
				</div>
			</form>
		</>
	);
};

export default ProductSetup;

const PRODUCT_TYPE_OPTIONS = [{ id: 1, label: 'Clothing', value: 'clothing' }];

const CATEGORIES = [{ id: 1, label: 'Clothing', value: 'clothing' }];

const COLLECTIONS = [{ id: 1, label: 'Winter Collection', value: 'winter-collection' }];

const STATUS = [
	{ id: 1, label: 'Active', value: 'active' },
	{ id: 2, label: 'Draft', value: 'draft' },
];

const VARIATION_OPTION = [
	{ id: 1, label: 'Size', value: 'size' },
	{ id: 2, label: 'Color', value: 'color' },
];

const TAGS = [];
