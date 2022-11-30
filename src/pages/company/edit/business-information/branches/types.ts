export type CountryTypes = {
	type: string;
	country: {
		label: string;
		value: string;
		flag: symbol;
		code: string;
		cca2: string;
	};
};

export type BranchFormFields = {
	type: 'HEADQUARTER' | 'BRANCH_OFFICE';
	country: CountryTypes;
	branchName: string;
	state: string;
	city: string;
	zipcode: string;
	street: string;
	email: string;
	phoneNumber: string;
};
