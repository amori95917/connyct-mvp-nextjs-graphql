import React from 'react';
import get from 'lodash.get';

import { RegisterOptions, DeepMap, FieldError, UseFormRegister, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { TextAreaProps } from '@/components/atoms/forms';
import { FormTextArea } from '@/components/molecules/forms';
import { FormErrorMessage } from '../form-error-message';

export type FormInputProps<TFormValues> = {
	name: Path<TFormValues>;
	label?: string;
	helperText?: string;
	rules?: RegisterOptions;
	register?: UseFormRegister<TFormValues>;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
	inputClassName?: string;
	labelClassName?: string;
} & Omit<TextAreaProps, 'name'>;

export const FormTextAreaField = <TFormValues extends Record<string, unknown>>({
	id,
	name,
	label,
	helperText,
	register,
	rules,
	errors,
	className,
	inputClassName,
	labelClassName,
	...props
}: FormInputProps<TFormValues>): JSX.Element => {
	// If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
	const errorMessages = get(errors, name);
	const hasError = !!(errors && errorMessages);
	return (
		<>
			<FormTextArea
				id={id}
				name={name}
				label={label}
				helperText={helperText}
				className={className}
				inputClassName={inputClassName}
				labelClassName={labelClassName}
				aria-invalid={hasError}
				{...props}
				{...(register && register(name, rules))}
			/>
			<ErrorMessage
				errors={errors}
				name={name as any}
				render={({ message }) => <FormErrorMessage className='mt-1'>{message}</FormErrorMessage>}
			/>
		</>
	);
};
