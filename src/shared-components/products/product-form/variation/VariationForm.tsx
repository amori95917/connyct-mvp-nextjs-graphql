import { FormInput, FormSelect } from '@/shared-components/forms';
import VariationPreview from './VariationPreview';

type VariationFormProps = {
	fields: any;
	remove: any;
	append: any;
	errors: any;
	register: any;
	getValues: any;
	control: any;
	watch: any;
};

const VariationForm = (props: VariationFormProps) => {
	const { fields, remove, append, errors, register, getValues, control, watch } = props;

	return (
		<>
			<p className='font-semibold mb-4 text-md'>Options</p>
			{fields.map((field, index) => {
				return (
					<div className='flex mb-4' key={field.id}>
						<div className='w-full md:w-4/12'>
							<FormInput
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
				);
			})}
			<button
				className='bg-gray-200 p-3'
				type='button'
				onClick={() => append({ option: '', value: '' })}>
				Add option
			</button>
			<div className='divide-y'></div>
			{/* PREVIEW */}
			{/* <VariationPreview variations={[{ id: 1, option: 'size', values: ['sm', 'md']}, {id: 2, option: 'color', values: ['Red', 'Green', 'Blue']}]}/> */}
			<VariationPreview variations={watch('variations')} />
		</>
	);
};

export default VariationForm;
