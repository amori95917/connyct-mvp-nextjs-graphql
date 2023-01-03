import { FormInput, FormSelect } from '@/shared-components/forms';
import { Button } from '@/ui-elements/atoms/button';
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
	setValue: any;
};

const VariationForm = (props: VariationFormProps) => {
	const { fields, remove, append, errors, register, getValues, control, watch, setValue } = props;
	const variations = watch('variations');
	return (
		<>
			<p className='font-semibold mb-4 mt-4 text-lg text-md'>Options</p>
			{fields.map((field, index) => {
				return (
					<div className='flex mb-4' key={field.id}>
						<div className='w-full md:w-4/12'>
							<FormInput
								id='option'
								type='text'
								name={`variations.${index}.option`}
								label={`Option ${index + 1}`}
								helperText='Choose option that can be applied as variants for a product'
								errors={errors}
								register={register}
							/>
						</div>
						<div className='w-full md:ml-4 md:w-4/12'>
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
			<Button variant='outlined' type='button' onClick={() => append({ option: '', value: '' })}>
				Add option
			</Button>
			<div className='divide-y'></div>
			{/* PREVIEW */}
			{/* <VariationPreview variations={[{ id: 1, option: 'size', values: ['sm', 'md']}, {id: 2, option: 'color', values: ['Red', 'Green', 'Blue']}]}/> */}
			{variations.length > 0 && <VariationPreview variations={variations} setValue={setValue} />}
		</>
	);
};

export default VariationForm;
