import * as yup from 'yup';

export const schema = yup.object({
	title: yup.string().required('Name is required'),
	description: yup.string(),
});
