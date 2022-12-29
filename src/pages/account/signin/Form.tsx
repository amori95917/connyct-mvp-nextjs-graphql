import Link from 'next/link';
import { FormInput, FormPasswordInput } from '@/shared-components/forms';
import { FormProps } from './types';
import { Button } from '@/ui-elements/atoms/button';

const Form: React.FC<FormProps> = ({ onSubmit, register, errors, formError }) => {
	const buttonClass =
		'bg-primary block font-semibold max-w-xs mx-auto px-3 py-3 rounded-lg text-white w-full hover:bg-primary focus:bg-primary';
	return (
		<>
			<div className='mb-8 text-center'>
				<h1 className='font-bold text-3xl text-gray-900'>LOGIN</h1>
				<p>Enter your information to login</p>
			</div>
			{formError?.message && (
				<div className='bg-red-400 mb-4 mx-auto p-2 rounded-md w-72'>
					<span className='leading-4 text-justify text-white w-full'>
						Sorry, we couldn&apos;t find an account with that username. Can we help you recover your{' '}
						<span className='underline'>
							<Link href='/account/username-recover'>username</Link>
						</span>
						?
					</span>
				</div>
			)}
			<form onSubmit={onSubmit}>
				<div className='flex'>
					<div className='mb-5 w-full'>
						<FormInput
							name='username'
							id='username'
							label='Username *'
							type='text'
							className='mb-4 mr-2'
							register={register}
							errors={errors}
						/>
					</div>
				</div>
				<div className='-mt-3 flex'>
					<FormPasswordInput
						id='password'
						name={'password'}
						register={register}
						errors={errors}
						label={'Password *'}
					/>
				</div>
				<div className='-mx-3 flex'>
					<div className='mb-5 pl-3 pr-5 w-full'>
						<Button className={buttonClass} variant='contained' loading={false} size='large'>
							Sign In
						</Button>
					</div>
				</div>
				<div className='flex justify-center'>
					<p>New to connyct?</p>
					<Link href={'/account/signup'} className='ml-1 text-primary'>
						Sign Up
					</Link>
				</div>
			</form>
		</>
	);
};

export default Form;
