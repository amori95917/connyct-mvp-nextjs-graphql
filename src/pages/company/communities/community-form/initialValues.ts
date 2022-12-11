import { CommunityFormFields } from './types';

export const initialValues = {
	name: '',
	communityPrivacyType: 'PUBLIC' as const,
};

export const getInitialValues = (data: CommunityFormFields) => {
	return {
		name: data?.name,
		communityPrivacyType: data?.type,
		description: data?.description,
	};
};
