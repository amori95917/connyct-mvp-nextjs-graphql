export type SigninFormFields = {
	username: string;
	password: string;
};

export type FormError = {
	message: string;
	code: string; // we will create our own enum later when we start working on error design in both server and client
};

export type FormProps = {
	onSubmit: () => void;
	register: any;
	errors: any;
	loading: boolean;
	formError: FormError;
};
