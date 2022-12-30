export type SignupFormFieldsTypes = {
	fullName: string;
	email: string;
	password: string;
	accountType: 'individual' | 'company';
	legalName: string;
	confirmPassword: string;
};

export type FormProps = {
	onSubmit: () => void;
	register: any;
	errors: any;
	accountType: 'individual' | 'company';
	loading: boolean;
	errorUserAlreadyExists: string;
	formError: any;
};
