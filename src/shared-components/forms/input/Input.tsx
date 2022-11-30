import React from 'react';
import get from 'lodash.get';

import { RegisterOptions, DeepMap, FieldError, UseFormRegister, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { InputProps } from 'src/ui-elements/atoms/forms';
import { FormInput } from 'src/ui-elements/molecules/forms';
import { classNames } from '@/utils/classnames';
import { FormErrorMessage } from '../form-error-message';

export type FormInputProps<TFormValues> = {
	name: Path<TFormValues>;
	label?: string | React.ReactNode;
	helperText?: string | React.ReactNode;
	wrapperClassName?: string;
	inputClassName?: string;
	labelClassName?: string;
	helperTextClassName?: string;
	register?: UseFormRegister<TFormValues>;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, 'name'>;

export const FormInputField = <TFormValues extends Record<string, unknown>>({
	id,
	name,
	label,
	helperText,
	register,
	errors,
	className,
	wrapperClassName = '',
	inputClassName,
	labelClassName,
	helperTextClassName = '',
	type,
	...props
}: FormInputProps<TFormValues>): JSX.Element => {
	// If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
	const errorMessages = get(errors, name);
	const hasError = !!(errors && errorMessages);
	const defaultWrapperClassName = 'flex flex-col w-full';
	return (
		<div className={classNames(defaultWrapperClassName, wrapperClassName)}>
			<FormInput
				type={type}
				id={id}
				name={name}
				label={label}
				helperText={helperText}
				className={classNames({ ' ': hasError })}
				inputClassName={inputClassName}
				labelClassName={labelClassName}
				helperTextClassName={helperTextClassName}
				aria-invalid={hasError}
				{...props}
				{...(register && register(name))}
			/>
			<ErrorMessage
				errors={errors}
				name={name as any}
				render={({ message }) => <FormErrorMessage className=''>{message}</FormErrorMessage>}
			/>
		</div>
	);
};
