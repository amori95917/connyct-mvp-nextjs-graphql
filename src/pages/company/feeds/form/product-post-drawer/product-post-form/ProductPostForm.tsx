import { useForm } from 'react-hook-form';

import { FormSelect } from '@/shared-components/forms';

const initialValues = {};

type PostProductFormFields = {
	product: string;
};

export const ProductPostForm = () => {
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm<PostProductFormFields>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: initialValues ?? {},
	});

	const onSubmit = handleSubmit(async input => {
		console.log(input, 'input');
	});

	return (
		<>
			<form className='h-full mt-5 relative' onSubmit={onSubmit}>
				<div>
					<FormSelect
						id='select-product'
						disabled={false}
						label={'Select Product'}
						helperText={'Search product or create product'}
						name={'product'}
						placeholder={'search product'}
						options={[
							{ label: 'Product1', value: 'product1', id: '1' },
							{ label: 'Product2', value: 'product2', id: '2' },
						]}
						defaultValue={'product1'}
						className={'bg-white'}
						labelClassName={''}
						wrapperClassName={'bg-white'}
						control={control}
						isCreateable={true}
						isMulti={false}
					/>
				</div>
				<div className='absolute bottom-0 w-full'>
					<button className='bg-primary w-full'>Release</button>
				</div>
			</form>
		</>
	);
};
