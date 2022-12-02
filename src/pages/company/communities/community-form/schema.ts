import * as yup from 'yup';

export const schema = yup.object({
	name: yup.string().required('Name is required'),
	communityPrivacyType: yup.string().oneOf(['PRIVATE', 'PUBLIC']),
	description: yup.string().required('Description is required'),
});
