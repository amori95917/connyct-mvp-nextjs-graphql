export type CommunityFormFields = {
	name: string;
	communityPrivacyType: 'PUBLIC' | 'PRIVATE';
	description: string;
	profilePicture: File[];
	coverPicture: File[];
};

export type CommunityFormPropsTypes = {
	isOpen?: boolean;
	setIsOpen: (isOpen: boolean) => void;
	companySlug: string;
	isEditing: boolean;
	community: any; // I will change it
};
