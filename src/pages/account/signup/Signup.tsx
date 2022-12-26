import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';

import { SIGNUP_MUTATION } from '@/graphql/auth';
import { setCookie } from '@/utils/cookies';
import { signupValidationSchema } from './signup.validation';
import { initialValues } from './signup.initialValues';
import { SignupFormFieldsTypes } from './signup.types';
import SignupIllustration from './SignupIllustration';
import Form from './Form';

const Signup = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignupFormFieldsTypes>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: initialValues ?? {},
		resolver: yupResolver(signupValidationSchema),
	});

	const [errorUserAlreadyExists, setErrorUserAlreadyExists] = useState('');

	const router = useRouter();

	const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

	const onSubmit = handleSubmit(async input => {
		const { accountType, confirmPassword, ...restInput } = input;
		// we need to omit accountType as our backend does not takes it. Rather, it asks for isCompanyAccount
		try {
			const response = await signup({
				variables: {
					data: {
						...restInput,
						isCompanyAccount: accountType === 'company',
					},
				},
			});
			if (response?.data?.signup) {
				const { accessToken, refreshToken, company, user } = response.data.signup;
				setCookie('CONNYCT_USER', {
					accessToken,
					refreshToken,
					user,
					company,
				});
				// may need to do https://nextjs.org/docs/routing/shallow-routing
				// create a constant for redirection routes like REDIRECTION_TO_COMPANY_AFTER_SIGNUP
				// REDIRECTION_TO_USER_AFTER_SIGNUP
				company
					? router.push(`/brand/${company[0].id}/edit/business-information/general`)
					: router.push(`/brand-suggestions`);
			}
		} catch (err: any) {
			setErrorUserAlreadyExists(err.message);
		}
	});
	return (
		<>
			<div className='flex items-center justify-center min-h-screen min-w-screen px-5 py-5'>
				<div className='bg-gray-100 max-w-max overflow-hidden rounded-1xl shadow-xl text-gray-500 w-full'>
					<div className='w-full md:flex'>
						<div className='bg-primary hidden px-10 py-10 w-2/5 md:block'>
							<SignupIllustration />
						</div>
						<div className='px-5 py-10 w-full md:px-10 md:w-3/5'>
							<Form
								onSubmit={onSubmit}
								register={register}
								errors={errors}
								formError={error}
								errorUserAlreadyExists={errorUserAlreadyExists}
								accountType={watch('accountType')}
								loading={loading}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Signup;
