import React from 'react';
import get from 'lodash.get';
import { RegisterOptions, DeepMap, FieldError, UseFormRegister, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { classNames } from '@/utils/classnames';
import { Select, SelectProps, FormErrorMessage } from '../../../atoms/forms';

export type FormSelectProps<TFormValues> = {
	children: React.ReactNode;
	name: Path<TFormValues>;
	placeholder?: string;
	label?: string;
	helperText?: string;
	rules?: RegisterOptions;
	register?: UseFormRegister<TFormValues>;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<SelectProps, 'name'>;

export const FormSelect = <TFormValues extends Record<string, unknown>>({
	id,
	name,
	label,
	placeholder,
	helperText,
	children,
	register,
	errors,
	className,
	...props
}: FormSelectProps<TFormValues>): JSX.Element => {
	const errorMessages = get(errors, name);
	const hasError = !!(errors && errorMessages);

	return (
		<>
			<div className={classNames('', className)} aria-live='polite'>
				{label && (
					<label
						className='block font-bold mb-2 text-gray-700 text-xs tracking-wide uppercase'
						htmlFor={id}>
						{label}
					</label>
				)}
				<Select
					id={id}
					name={name}
					placeholder={placeholder}
					aria-invalid={hasError}
					{...props}
					{...(register && register(name))}>
					{children}
				</Select>
				<div className='mt-1'>
					{helperText && <p className='italic text-gray-600 text-xs'>{helperText}</p>}
					{errors[id] && (
						<ErrorMessage
							errors={errors[id]}
							name={name as any}
							render={({ message }) => <FormErrorMessage className='mt-1'>{message}</FormErrorMessage>}
						/>
					)}
				</div>
			</div>
		</>
	);
};

FormSelect.displayName = 'FormSelect';
