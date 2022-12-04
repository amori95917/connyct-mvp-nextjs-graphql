export type CommunityFormFields = {
	name: string;
	communityPrivacyType: 'public' | 'private';
	description: string;
	profilePicture: File[];
	coverPicture: File[];
};
