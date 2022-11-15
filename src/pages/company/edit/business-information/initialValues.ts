export const generalFromInitialValues = (data: any) => {
	const {
		name,
		legalName,
		description = '',
		registrationNumber = '',
		establishedDate = '',
		slogan = '',
		registrationType = 'vat' as const,
		companyStage = '',
	} = data;
	return {
		name,
		legalName,
		slogan,
		description: description || '',
		registrationNumber,
		companyStage,
		establishedDate: establishedDate?.split('T')[0] || '',
		registrationType: registrationType,
	};
};

export const documentsFormInitialValues = (data: any) => {
	const registrationType = data?.registrationType;
	return { documentType: registrationType || 'VAT', documentFile: null };
};

export const CitizenshipUploadInitialValues = {};
