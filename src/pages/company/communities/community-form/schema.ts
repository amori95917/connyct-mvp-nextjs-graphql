import * as yup from 'yup';

export const schema = yup.object({
	name: yup.string().required('Name is required'),
	communityPrivacyType: yup.string().oneOf(['PRIVATE', 'PUBLIC']).required('Type is required'),
	description: yup.string().required('Description is required'),
	profilePicture: yup.mixed(),
});
