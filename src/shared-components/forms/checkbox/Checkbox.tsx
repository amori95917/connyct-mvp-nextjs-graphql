import get from 'lodash.get';
import { DeepMap, FieldError, UseFormRegister, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { CheckboxProps } from 'src/ui-elements/atoms/forms';
import { FormCheckbox } from 'src/ui-elements/molecules/forms';
import { FormErrorMessage } from '../form-error-message';
import { classNames } from '@/utils/classnames';

export type FormCheckboxProps<TFormValues> = {
	name: Path<TFormValues>;
	label?: string | React.ReactNode;
	helperText?: string | React.ReactNode;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
	register?: UseFormRegister<TFormValues>;
} & Omit<CheckboxProps, 'name'>;

export const FormCheckboxField = <TFormValues extends Record<string, unknown>>({
	id,
	name,
	label,
	helperText,
	errors,
	register,
	className,
	...props
}: FormCheckboxProps<TFormValues>): JSX.Element => {
	const errorMessages = get(errors, name);
	const hasError = !!(errors && errorMessages);
	return (
		<>
			<FormCheckbox
				id={id}
				name={name}
				aria-invalid={hasError}
				className={classNames({ ' ': hasError })}
				{...props}
				{...(register && register(name))}
			/>
			<ErrorMessage
				errors={errors}
				name={name as any}
				render={({ message }) => <FormErrorMessage className='mt-1'>{message}</FormErrorMessage>}
			/>
		</>
	);
};
