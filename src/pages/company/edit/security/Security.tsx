import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormPasswordInput } from '@/shared-components/forms';
import { SecurityFormFields } from './types';
import { securitySchema } from './validation';

const Security = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SecurityFormFields>({
		// mode: 'onSubmit',
		defaultValues: { password: '', confirmPassword: '' },
		resolver: yupResolver(securitySchema),
	});

	const onSubmit = handleSubmit(async input => {
		console.log(input);
	});
	const buttonClass =
		'bg-primary block font-semibold px-3 py-3 rounded-lg text-white  hover:bg-primary focus:bg-primary';

	return (
		<>
			<form onSubmit={onSubmit}>
				<p className='font-semibold mb-4 text-xl'>Set Password</p>
				<div className='w-full md:w-90'>
					<FormPasswordInput
						label={'New Password *'}
						name={'password'}
						id={'password'}
						register={register}
						errors={errors}
					/>
					<FormPasswordInput
						label={'Confirm Password*'}
						name={'confirmPassword'}
						id={'confirm-password'}
						register={register}
						errors={errors}
						helperText='8 characters or longer. Combine upper and lowercase letters and numbers.'
					/>
				</div>
				<div className='flex justify-end'>
					<button className={buttonClass}>Change Password</button>
				</div>
			</form>
		</>
	);
};

export default Security;
