import * as yup from 'yup';

const signupValidationSchema = yup.object({
	fullName: yup.string().when('accountType', {
		is: 'individual',
		then: yup.string().required('Full name is required'),
	}),
	email: yup.string().required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.matches(/^(?=.*[a-z])/, 'At least one lowercase')
		.matches(/^(?=.*[A-Z])/, 'At least one uppercase ')
		.matches(/^(?=.*[0-9])/, 'At least one number ')
		.matches(/^(?=.*[!@#\$%\^&\*])/, 'At least one special case character')
		.matches(/^(?=.{6,})/, 'At least 6 characters'),
	accountType: yup.string().label('Account type').oneOf(['individual', 'company']),
	legalName: yup.string().label('Legal name').when('accountType', {
		is: 'company',
		then: yup.string().required(),
	}),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export { signupValidationSchema };
