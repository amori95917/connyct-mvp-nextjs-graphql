export type CommunityFormFields = {
	name: string;
	type: 'PUBLIC' | 'PRIVATE';
	description: string;
	profile?: File[];
	coverImage?: File[];
};

export type CommunityFormPropsTypes = {
	isOpen?: boolean;
	setIsOpen: (isOpen: boolean) => void;
	companySlug: string;
	community?: any; // I will change it
};
