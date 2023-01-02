import { FormInput, FormSelect } from '@/shared-components/forms';
import { Button } from '@/ui-elements/atoms/button';

type AttributeFormProps = {
	fields: any;
	remove: any;
	append: any;
	errors: any;
	register: any;
	getValues: any;
	control: any;
};
const AttributeForm = (props: AttributeFormProps) => {
	const { fields, remove, append, errors, register, getValues, control } = props;
	return (
		<>
			<div className='flex gap-4 items-center mb-6'>
				<h1 className='font-semibold text-lg'>Attributes</h1>
				<Button
					className='px-4 py-2 text-primary'
					variant='outlined'
					onClick={() => append({ option: '', value: '' })}>
					Add new attribute
				</Button>
			</div>
			{fields.map((field, index) => {
				return (
					<div className='flex mb-4' key={field.id}>
						<div className='w-full md:w-4/12'>
							<FormInput
								id='option'
								type='text'
								name={`attributes.${index}.option`}
								label='Option'
								helperText='Choose option that can be applied as attributes for a product'
								errors={errors}
								register={register}
							/>
						</div>
						<div className='w-full md:ml-4 md:w-8/12'>
							<FormSelect
								name={`attributes.${index}.values`}
								label=''
								placeholder='Choose value'
								options={[]}
								helperText='You can choose multiple values'
								wrapperClassName='mt-7'
								errors={errors}
								register={register}
								isCreateable
								defaultValue={[getValues(`attributes.${index}.values`)]}
								control={control}
							/>
							<p onClick={() => remove(index)}>Delete</p>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default AttributeForm;
