import React from 'react';
import get from 'lodash.get';

import { RegisterOptions, DeepMap, FieldError, UseFormRegister, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { classNames } from '@/utils/classnames';
import { EditableFieldProps, EditableField, FormErrorMessage } from '../../../atoms/forms';

export type FormInputProps<TFormValues> = {
	name: Path<TFormValues>;
	label?: string;
	helperText?: string;
	rules?: RegisterOptions;
	isEditable?: boolean;
	register?: UseFormRegister<TFormValues>;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<EditableFieldProps, 'name'>;

export const EditableFormField = <TFormValues extends Record<string, unknown>>({
	id,
	name,
	label,
	helperText,
	register,
	rules,
	errors,
	className,
	isEditable,
	...props
}: FormInputProps<TFormValues>): JSX.Element => {
	// If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
	const errorMessages = get(errors, name);
	const hasError = !!(errors && errorMessages);
	return (
		<div className={classNames('flex flex-col', className)} aria-live='polite'>
			{label && (
				<label
					className='block font-bold mb-2 text-gray-700 text-xs tracking-wide uppercase'
					htmlFor={id}>
					{label}
				</label>
			)}
			<EditableField
				id={id}
				name={name}
				aria-invalid={hasError}
				isEditable={isEditable}
				className={classNames({
					'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600':
						hasError,
				})}
				{...props}
				{...(register && register(name, rules))}
			/>
			{helperText && <p className='italic text-gray-600 text-xs'>{helperText}</p>}
			<ErrorMessage
				errors={errors}
				name={name as any}
				render={({ message }) => <FormErrorMessage className='font-light'>{message}</FormErrorMessage>}
			/>
		</div>
	);
};
