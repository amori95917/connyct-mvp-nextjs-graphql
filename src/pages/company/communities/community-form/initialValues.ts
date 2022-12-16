import { CommunityFormFields } from './types';

export const initialValues = {
	name: '',
	type: 'PUBLIC' as const,
};

export const getInitialValues = (data: CommunityFormFields) => {
	return {
		profile: data?.profile ? [{ preview: data?.profile }] : [],
		name: data?.name || '',
		description: data?.description || '',
		type: data?.type,
		coverPicture: data?.coverPicture ? [{ preview: data?.coverPicture }] : [],
	};
};
