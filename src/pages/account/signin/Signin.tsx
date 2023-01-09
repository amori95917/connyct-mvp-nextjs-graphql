import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { LOGIN_MUTATION } from '@/graphql/auth';
import { setCookie } from '@/utils/cookies';
import Form from './Form';
import { schema } from './schema';
import { initialValues } from './signin.initialValues';
import SigninIllustration from './SigninIllustration';
import { SigninFormFields } from './types';
import { Company, User } from '@/generated/graphql';

const Signin = () => {
	const router = useRouter();
	const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SigninFormFields>({
		mode: 'onBlur',
		defaultValues: initialValues ?? {},
		resolver: yupResolver(schema),
	});

	const redirectTo = (company: Company[], user: User) => {
		if (user.activeRole?.name === 'USER') {
			router.push('/feeds');
			return;
		} else {
			if (user.activeRole?.name === 'OWNER' && company.length > 0) {
				router.push(`/brand/${company[0].id}/edit/business-information/general`);
				return;
			} else {
				// WILL DECIDE
				router.push('/');
			}
		}
	};

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
				const { accessToken, refreshToken, company, user } = response.data.login;
				const cookieToSet = {
					accessToken,
					refreshToken,
					user,
					company,
				};
				setCookie('CONNYCT_USER', cookieToSet);
				console.timeEnd();
				redirectTo(company, user);
			}
		} catch (e) {
			console.error(e);
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
