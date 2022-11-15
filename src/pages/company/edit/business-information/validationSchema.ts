import * as yup from 'yup';

export const generalFormValidationSchema = yup.object({
	name: yup.string().required('Company name is required').min(2).max(20).nullable(),
	registrationNumber: yup.string().required('Registration number is required').nullable(),
	establishedDate: yup.string().required('Established date is required').nullable(),
	registrationType: yup.string().oneOf(['vat', 'pan'], 'one of required'),
});

export const documentsFormValidationSchema = yup.object({
	documentFile: yup.mixed().required('File is required.'),
});

export const CitizenshipUploadValidationSchema = yup.object({
	citizenshipFront: yup.mixed().required('File is required'),
	citizenshipBack: yup.mixed().required('File is required'),
});
