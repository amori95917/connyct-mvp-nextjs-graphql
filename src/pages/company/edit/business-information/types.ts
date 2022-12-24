import { Company, Maybe } from '@/generated/graphql';

export type GeneralFormFields = {
	name: string;
	legalName: string;
	description: string;
	registrationNumber: string;
	registrationNumberType: string;
	establishedDate: string;
	slogan: string;
	companyStage: string;
};

{
	/** TODO: generate the the types from the backend schema and pick accordingly as required */
}

// export type GeneralFormFields = Maybe<CompanyEditInput>;

export type DocumentsProps = {
	companySlug: string;
	data: { getCompanyById: Maybe<Company> };
	submitCompletedRoute: string[] | undefined;
	setSubmitCompletedRoute: (submitCompletedRoute: string[]) => void;
};

export type DocumentsFormFields = {
	registrationNumberType: any;
	documentFile: any;
};

export type CitizenshipUploadFields = {
	citizenshipFront: any;
	citizenshipBack: any;
};
