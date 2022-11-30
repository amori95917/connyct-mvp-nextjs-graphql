export const generalFromInitialValues = (data: any) => {
	console.log(data, 'initial value of general section');
	const {
		name,
		legalName,
		description = '',
		registrationNumber = '',
		establishedDate = '',
		slogan = '',
		registrationNumberType = 'VAT' as const,
		companyStage = '',
	} = data;
	return {
		name,
		legalName,
		slogan,
		description: description || '',
		registrationNumber,
		companyStage: getCompanyStage(companyStage),
		establishedDate: establishedDate?.split('T')[0] || '',
		registrationNumberType,
	};
};

export const documentsFormInitialValues = (data: any) => {
	const registrationNumberType = data?.registrationNumberType;
	return { documentType: registrationNumberType || 'VAT', documentFile: null };
};
export const documentsRegistrationFormInitialValues = (data: any) => {
	const registrationNumberType = data?.registrationNumberType;
	return { documentType: registrationNumberType || 'COMPANY_REGISTRATION', documentFile: null };
};

function getCompanyStage(companyStage: string | null) {
	console.log(companyStage, ' ##');
	if (!companyStage) {
		return '';
	} else {
		if (companyStage === 'STARTUP') {
			return { label: 'Start up', value: 'STARTUP' };
		}
		if (companyStage === 'SCALEUP') {
			return { label: 'Scale up', value: 'SCALEUP' };
		}
	}
}
