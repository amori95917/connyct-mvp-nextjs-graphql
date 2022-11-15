export const isEnabled = (data: any) => {
	if (data?.getCompanyById) {
		const { name, legalName, registrationNumber, establishedDate } = data?.getCompanyById;
		if (name && legalName && registrationNumber && establishedDate) {
			return true;
		} else {
			return false;
		}
	}
};
