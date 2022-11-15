import * as yup from 'yup';

export const schema = yup.object({
	type: yup.string().oneOf(['hq', 'branch'], ''),
	country: yup.string().required('Country is required').nullable(),
	city: yup.string().required('City is required').nullable(),
	state: yup.string().required('State is required').nullable(),
	street: yup.string().required('Street  is required').nullable(),
	email: yup.string().required('Contact email is required').email().nullable(),
});
