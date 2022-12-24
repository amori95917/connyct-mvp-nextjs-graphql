export const generalFromInitialValues = (data: any) => {
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
	console.log('data', data);
	const registrationNumberType = data?.getCompanyById?.registrationNumberType;
	return { registrationNumberType: registrationNumberType || 'VAT', documentFile: null };
};
export const documentsRegistrationFormInitialValues = (data: any) => {
	const registrationNumberType = data?.getCompanyById?.registrationNumberType;
	return {
		registrationNumberType: registrationNumberType || 'COMPANY_REGISTRATION',
		documentFile: null,
	};
};

function getCompanyStage(companyStage: string | null) {
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
