import { useFieldArray, useForm } from 'react-hook-form';

import { User } from '@/generated/graphql';
import { CoverPhotoUploadForm } from '@/shared-components/cover-photo-upload-form';
import { FormCheckbox, FormInput, FormSelect } from '@/shared-components/forms';
import { Button } from '@/ui-elements/atoms/button';
import CloseIcon from '@/ui-elements/atoms/icons/CloseIcon';
import Link from 'next/link';
import { CategoryInput } from '../commons/category-input';
import Image from 'next/image';
import ProductImages from './ProductImages';
import { MasonryGallery } from '@/shared-components/masonry-gallery';

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
	categories: string;
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
	category: '',
	description: '',
	productType: null,
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
	media: [],
	// hasVariants: false,
	// variations: [],
	// allVariations: [],
	// attributes: [],
	status: 'draft' as const,
};

type ProductSetupProps = {
	companySlug: string;
	authorizedUser: User;
};

const ProductSetup = (props: ProductSetupProps) => {
	const { companySlug } = props;
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		watch,
		// getValues,
		setValue,
		resetField,
	} = useForm<ProductFormFields>({
		defaultValues: initialValues ?? {},
	});
	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'variations', // unique name for your Field Array
	});

	// const {
	// 	fields: attributeFields,
	// 	append: appendAttribute,
	// 	remove: removeAttribute,
	// } = useFieldArray({
	// 	control, // control props comes from useForm (optional: if you are using FormContext)
	// 	name: 'attributes', // unique name for your Field Array
	// });

	const onSubmit = handleSubmit(data => {
		console.log('submitting...');
		console.log('data', data);
	});

	console.log('cat', watch('category'));

	// const hasVariants = watch('hasVariants');
	return (
		<>
			<div className='bg-white mt-16'>
				<div className='py-2'>
					<div className='container flex justify-between mx-auto'>
						<h1 className='flex-1 font-bold self-center text-3xl text-center text-primary'>
							Create a new product
						</h1>
						<Link href={`/brands/${companySlug}/products`}>
							<CloseIcon className='cursor-pointer h-10 w-10' />
						</Link>
					</div>
				</div>
				<div className=''>
					<form onSubmit={onSubmit} className=''>
						<div
							className='bg-white container flex gap-4 mx-auto px-4 py-6'
							style={{ height: 'calc(100vh - 60px - 80px)', overflowY: 'auto' }}>
							<div className='w-full md:w-4/12'>
								<div className='bg-white md:mb-2'>
									<p className='font-semibold mb-4 text-lg text-primary'>Basic Information</p>
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
										wrapperClassName='mt-4'
										inputClassName='pb-10'
										register={register}
										rules={{ required: 'You must enter the description' }}
										errors={errors}
									/>
								</div>
								<div className='bg-white md:mb-2'>
									<p className='font-semibold mb-4 text-lg text-primary'>Pricing</p>
									<div className='flex md:gap-4'>
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
								<div className='bg-white md:mb-2'>
									<h1 className='font-semibold mb-6 text-lg text-primary'>Product Images</h1>
									<div className='mb-24'>
										<ProductImages errors={errors} control={control} />
									</div>
								</div>
							</div>
							<div className='w-full md:w-4/12'>
								<div className='bg-white md:mb-8'>
									<h1 className='font-semibold mb-4 text-lg text-primary'>Organize Product</h1>
									<FormSelect
										name='productType'
										label='Product Type'
										placeholder='Product Type'
										options={PRODUCT_TYPE_OPTIONS}
										helperText='Product type of an product. For e.g Clothing'
										errors={errors}
										register={register}
										wrapperClassName='mb-4'
										control={control}
										isCreateable={true}
										isMulti={false}
									/>
									<CategoryInput
										name='category'
										label='Category'
										placeholder='Category'
										helperText='Category of a product. For e.g Men'
										errors={errors}
										register={register}
										control={control}
										setValue={setValue}
										resetField={resetField}
									/>
									<FormSelect
										name='collections'
										label='Collection'
										placeholder='Collection'
										options={COLLECTIONS}
										helperText='Collection of a product. For e.g Winter Collection'
										errors={errors}
										register={register}
										wrapperClassName='mb-4'
										control={control}
										isCreateable={true}
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
										isCreateable={true}
									/>
								</div>
								<div className='bg-white md:mb-4'>
									<p className='font-semibold mb-4 text-lg text-primary'>Inventory</p>
									<div className='flex md:gap-4'>
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
										<div className='mb-4 mt-4 w-full md:w-6/12'>
											<FormCheckbox<ProductFormFields>
												id='trackQuantity'
												name='inventory.trackQuantity'
												label='Track quantity'
												labelClassName='mb-0 mr-2'
												register={register}
												errors={errors}
											/>
										</div>
									</div>
									<div className='flex'>
										<div className='w-full md:w-6/12'>
											<FormInput
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
							</div>
							<div className='w-full md:w-4/12'>
								<h1 className='font-semibold mb-1 text-lg text-primary'>Product Preview</h1>
								<p className='italic mb-4 text-gray-600 text-xs'>
									This is how it will look like when you add this product to feed
								</p>
								<div className='bg-white relative rounded-lg shadow-lg'>
									{/* {watch('media') && (
										<MasonryGallery
											items={watch('media') || []}
											itemKey={'preview'}
											srcKey={'preview'}
											altKey={'name'}
										/>
									)} */}
									{watch('media')?.map(media => {
										return (
											<Image
												key={media.preview}
												src={media.preview}
												alt={media.name}
												width='0'
												height='0'
												sizes='100vw'
												className='h-auto w-full'
											/>
										);
									})}

									<div className='p-4'>
										<h3 className='font-bold mb-0 text-lg text-primary'>{watch('name')}</h3>
										<div className='flex gap-1'>
											{watch('productType') && (
												<>
													<span className='bg-brandSecondary font-semibold mb-2 mr-2 px-3 py-1 rounded-full text-sm text-white'>
														{watch('productType').label}
													</span>
												</>
											)}
											{watch('category') && (
												<>
													<span className='bg-brandSecondary font-semibold mb-2 mr-2 px-3 py-1 rounded-full text-sm text-white'>
														{watch('category').name}
													</span>
												</>
											)}
										</div>
										<div className='flex gap-4'>
											<p className='mb-2 text-gray-700'>{watch('pricing.price')}</p>
											<p className='line-through mb-2 text-gray-700'>{watch('pricing.comparePrice')}</p>
										</div>
										<p className='text-gray-600 text-sm'>{watch('description')}</p>
										<div className='add-to-cart mt-4'></div>
									</div>
								</div>
							</div>
						</div>
						<div className='footer shadow-md w-full'>
							<div className='bottom-0 container fixed h-20 mt-4 mx-auto w-full'>
								<div className='flex justify-end p-4'>
									<Button type='submit' className='py-4'>
										Create new product
									</Button>
								</div>
							</div>
						</div>
						{/* <div className='w-full'>
							<div className='bg-white p-4 md:mb-8'>
						<p className='font-semibold mb-4 text-lg'>Variants</p>
						<div className='w-full'>
							<FormCheckbox
								id='hasVariants'
								name='hasVariants'
								label='This product has multiple options'
								labelClassName='mb-0 mr-2'
								register={register}
								errors={errors}
							/>
						</div>
						<div className='divide-y-2'></div>
						{hasVariants && (
							<VariationForm
								fields={fields}
								append={append}
								remove={remove}
								getValues={getValues}
								errors={errors}
								register={register}
								control={control}
								watch={watch}
								setValue={setValue}
							/>
						)}
					</div>
						</div> */}
					</form>
				</div>
			</div>
			{/* <h1 className="font-semibold text-lg">Product Setup</h1> */}
		</>
	);
};

export default ProductSetup;

const PRODUCT_TYPE_OPTIONS = [
	{ id: 1, label: 'Clothing', value: 'clothing' },
	{ id: 2, label: 'Beverages', value: 'beverages' },
];

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
