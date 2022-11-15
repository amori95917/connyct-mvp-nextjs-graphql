import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormPasswordInput, FormSelect } from '@/shared-components/forms';
import { AccountFormFields } from './types';
import { accountSchema } from './validation';

const Account = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<AccountFormFields>({
		// mode: 'onSubmit',
		defaultValues: { deactivateReason: '' },
		resolver: yupResolver(accountSchema),
	});

	const onSubmit = handleSubmit(async input => {
		console.log(input);
	});
	const buttonClass =
		'bg-primary block font-semibold px-3 py-3 rounded-lg text-white  hover:bg-primary focus:bg-primary';

	return (
		<>
			<form onSubmit={onSubmit}>
				<p className='font-semibold mb-4 text-xl'>Account</p>
				<div className='gap-2 grid grid-cols-2'>
					<div className='notice'>
						<p className='text-gray-800'>What happens when you deactivate your account?</p>
						<ul className='list-decimal text-gray-400'>
							<li className='py-2'>Your profile, feeds and products wont be shown on Connyct anymore</li>
							<li>Active orders will be cancelled</li>
						</ul>
					</div>
					<div className='deactivation-form'>
						<FormSelect
							id='deactivate-reason'
							label={"I'm leaving because..."}
							name={'deactivateReason'}
							placeholder={'Choose a reason'}
							options={[
								{ label: 'Product1', value: 'product1', id: '1' },
								{ label: 'Product2', value: 'product2', id: '2' },
							]}
							className={'bg-white'}
							labelClassName={''}
							isMulti={false}
							control={control}
						/>
					</div>
				</div>

				<div className='flex justify-end pt-4'>
					<button className={buttonClass}>Deactivate Account</button>
				</div>
			</form>
		</>
	);
};

export default Account;
