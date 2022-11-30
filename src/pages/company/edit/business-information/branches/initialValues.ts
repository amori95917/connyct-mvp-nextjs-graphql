export const initialValues = currentBranch => {
	if (!currentBranch) {
		return {
			type: 'HEADQUARTER' as const,
			country: {
				label: 'Nepal',
				value: 'Nepal',
				flag: '🇳🇵',
				code: '977',
				cca2: 'NP',
			},
			zipcode: '',
			state: '',
			street: '',
			email: '',
			phoneNumber: '',
		};
	} else {
		const { city, contactEmail, contactNumber, country, state, street, type, zipCode } =
			currentBranch;
		return {
			type: type,
			country: {
				label: country,
				value: country,
				flag: '',
				code: '',
				cca2: '',
			},
			city: city,
			zipcode: zipCode,
			state: state,
			street: street,
			email: contactEmail,
			phoneNumber: contactNumber,
		};
	}
};

// city: 'asdf';
// contactEmail: 'joseffregmi111@gmail.com';
// contactNumber: '9860206442';
// country: 'Nepal';
// createdAt: '2022-11-29T15:46:17.197Z';
// id: 'cfe199af-5906-467f-9b39-db4ef862caa6';
// name: null;
// state: 'sdf';
// street: 'asdf';
// type: 'HEADQUARTER';
// updatedAt: '2022-11-29T15:46:17.197Z';
// zipCode: '121';
