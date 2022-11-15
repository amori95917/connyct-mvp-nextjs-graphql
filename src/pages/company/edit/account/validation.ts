import * as yup from 'yup';

export const accountSchema = yup.object({
	deactivationReason: yup.string().required('Deactivation reason is required'),
});
