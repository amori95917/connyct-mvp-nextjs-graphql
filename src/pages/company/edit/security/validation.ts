import * as yup from 'yup';

export const securitySchema = yup.object({
	password: yup
		.string()
		.required('Password is required')
		.matches(/^(?=.*[a-z])/, 'At least one lowercase')
		.matches(/^(?=.*[A-Z])/, 'At least one uppercase ')
		.matches(/^(?=.*[0-9])/, 'At least one number ')
		.matches(/^(?=.*[!@#\$%\^&\*])/, 'At least one special case character')
		.matches(/^(?=.{6,})/, 'At least 6 characters'),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const documentsFormValidationSchema = yup.object({});
