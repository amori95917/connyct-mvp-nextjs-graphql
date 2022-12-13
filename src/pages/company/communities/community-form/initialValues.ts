import { CommunityFormFields } from './types';

export const initialValues = {
	name: '',
	type: 'PUBLIC' as const,
};

export const getInitialValues = (data: CommunityFormFields) => {
	return {
		name: data?.name,
		description: data?.description,
	};
};
