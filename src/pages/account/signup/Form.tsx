import Link from 'next/link';

import { FormInput, FormRadio, FormPasswordInput } from '@/shared-components/forms';
import { FormProps } from './signup.types';

const Form: React.FC<FormProps> = ({
	onSubmit,
	register,
	errors,
	accountType,
	loading,
	errorUserAlreadyExists,
}) => {
	const buttonClass =
		'bg-primary block font-semibold max-w-xs mx-auto px-3 py-3 rounded-lg text-white w-full hover:bg-indigo-700 focus:bg-indigo-700';
	return (
		<>
			<div className='mb-5 text-center'>
				<h1 className='font-bold text-3xl text-gray-900'>REGISTER</h1>
				<p>Enter your information to register</p>
				{errorUserAlreadyExists && (
					<div className='bg-red-400 mb-4 p-2 rounded-md'>
						<span className='leading-4 text-justify text-white w-full'>
							User already exists. You want to
							<span>
								<Link href='/account/login' className='underline'>
									Login
								</Link>
								instead?
							</span>
						</span>
					</div>
				)}
			</div>
			<form onSubmit={onSubmit}>
				<label className='block font-bold mb-2 text-gray-700 text-xs tracking-wide uppercase'>
					Account Type *
				</label>
				<div className='-mx-3 flex mb-5 ml-1'>
					<div className='flex items-center mb-5 w-1/2'>
						<FormRadio
							id='accountType-individual'
							name='accountType'
							value={'individual'}
							label='Individual'
							className='mb-4 mr-2'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='flex items-center mb-5 px-3 w-1/2'>
						<FormRadio
							id='accountType-company'
							name='accountType'
							value={'company'}
							label='Company'
							className='mb-4 mr-2'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				{accountType === 'company' && (
					<div className='-mt-7 -mx-3 flex'>
						<div className='mb-5 px-3 w-full'>
							<FormInput
								name='legalName'
								id='legalName'
								label='Legal Name*'
								type='text'
								className='mb-4 mr-2'
								register={register}
								errors={errors}
							/>
						</div>
					</div>
				)}
				<div className='-mt-5 -mx-3 flex'>
					<div className='mb-5 px-3 w-full'>
						<FormInput
							name='fullName'
							id='fullName'
							label={accountType === 'company' ? 'Full Name' : 'Full Name *'}
							type='text'
							className='mb-4 mr-2'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='-mt-5 -mx-3 flex'>
					<div className='mb-5 px-3 w-full'>
						<FormInput
							name='email'
							id='email'
							label='Email *'
							type='text'
							className='mb-4 mr-2'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='-mt-5 flex flex-col md:flex-row'>
					<div className='mb-6 px-1 relative w-full'>
						<FormPasswordInput
							label={'Password *'}
							name={'password'}
							id={'password'}
							register={register}
							errors={errors}
							helperText='An example of valid password format is Test@123 '
						/>
					</div>
					<div className='mb-6 px-1 w-full'>
						<FormPasswordInput
							label={'Confirm Password*'}
							name={'confirmPassword'}
							id={'confirm-password'}
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='-mx-3 flex'>
					<div className='mb-5 px-3 w-full'>
						<div className='-mx-3 flex w-full'>
							<div className='mb-5 pl-3 w-full'>
								<button className={buttonClass}>Sign Up</button>
							</div>
						</div>
					</div>
				</div>
				<div className='flex justify-center'>
					<span>Already have an account?</span>
					<Link href={'/account/login'} className='ml-1 text-primary'>
						Sign In
					</Link>
				</div>
			</form>
		</>
	);
};

export default Form;
