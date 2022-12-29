import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';

import { LOGIN_MUTATION } from '@/graphql/auth';
import { setCookie } from '@/utils/cookies';
import SigninIllustration from './SigninIllustration';
import { SigninFormFields } from './types';
import { initialValues } from './signin.initialValues';
import { schema } from './schema';
import Form from './Form';

const Signin = () => {
	const router = useRouter();
	const [error, setError] = useState({});
	const [login, { loading }] = useMutation(LOGIN_MUTATION);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SigninFormFields>({
		mode: 'onBlur',
		defaultValues: initialValues ?? {},
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(async input => {
		const { username, password } = input;
		try {
			const response = await login({
				variables: {
					data: {
						emailOrUsername: username,
						password,
					},
				},
			});
			console.time();
			if (response?.data?.login) {
				setError({});
				const { accessToken, refreshToken, company, user } = response.data.login;
				const cookieToSet = {
					accessToken,
					refreshToken,
					user,
					company,
				};
				setCookie('CONNYCT_USER', cookieToSet);
				console.timeEnd();
				company.length > 0
					? router.push(`/brand/${company[0].id}/edit/business-information/general`)
					: router.push(`/brand-suggestions`);
			}
		} catch (e) {
			setError({ message: e.message, code: 'INVALID_USERNAME_PASSWORD' });
		}
	});
	return (
		<>
			<div className='flex items-center justify-center min-h-screen min-w-screen px-5 py-5'>
				<div className='bg-gray-100 max-w-max overflow-hidden rounded-1xl shadow-xl text-gray-500 w-full'>
					<div className='w-full md:flex'>
						<div className='bg-primary hidden px-10 py-10 w-2/5 md:block'>
							<SigninIllustration />
						</div>
						<div className='px-4 py-8 w-full md:px-10 md:w-3/5'>
							<Form
								onSubmit={onSubmit}
								register={register}
								errors={errors}
								loading={loading}
								formError={error}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* <form onSubmit={onSubmit} className='flex mt-6'></form> */}
		</>
	);
};
export default Signin;
