export type GeneralFormFields = {
	name: string;
	legalName: string;
	description: string;
	registrationNumber: string;
	registrationType: string;
	establishedDate: string;
	slogan: string;
	companyStage: string;
};

{
	/** TODO: generate the the types from the backend schema and pick accordingly as required */
}

// export type GeneralFormFields = Maybe<CompanyEditInput>;

export type DocumentsFormFields = {
	documentType: any;
	documentFile: any;
};

export type CitizenshipUploadFields = {
	citizenshipFront: any;
	citizenshipBack: any;
};
