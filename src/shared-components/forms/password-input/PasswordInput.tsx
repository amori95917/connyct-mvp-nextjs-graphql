import { useState, ClipboardEvent } from 'react';

import { RegisterOptions, DeepMap, FieldError, UseFormRegister, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import get from 'lodash.get';

import { FormInput } from 'src/ui-elements/molecules/forms';
import { InputProps } from 'src/ui-elements/atoms/forms';
import { PasswordLock, PasswordUnlock } from '@/shared-components/icons';
import { classNames } from '@/utils/classnames';
import { FormErrorMessage } from '../form-error-message';

export type FormInputProps<TFormValues> = {
	name: Path<TFormValues>;
	label?: string | React.ReactNode;
	helperText?: string | React.ReactNode;
	rules?: RegisterOptions;
	inputClassName?: string;
	labelClassName?: string;
	register?: UseFormRegister<TFormValues>;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, 'name'>;

export const FormPasswordInput = <TFormValues extends Record<string, unknown>>({
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
}: FormInputProps<TFormValues>) => {
	const [showPassword, setShowPassword] = useState(false);

	const onPasswordHandler = () => {
		setShowPassword(!showPassword);
	};
	const errorMessages = get(errors, name);
	const hasError = !!(errors && errorMessages);
	return (
		<div className='mb-6 relative w-full'>
			<FormInput
				type={showPassword ? 'text' : 'password'}
				id={id}
				name={name}
				label={label}
				helperText={helperText}
				className={classNames({ '': hasError })}
				inputClassName={inputClassName}
				labelClassName={labelClassName}
				aria-invalid={hasError}
				onCopy={(e: ClipboardEvent<HTMLInputElement>) => {
					e.preventDefault();
					return false;
				}}
				onPaste={(e: ClipboardEvent<HTMLInputElement>) => {
					e.preventDefault();
					return false;
				}}
				{...props}
				{...(register && register(name))}
			/>
			<ErrorMessage
				errors={errors}
				name={name as any}
				render={({ message }) => <FormErrorMessage className=''>{message}</FormErrorMessage>}
			/>
			{showPassword ? (
				<button type='button' onClick={onPasswordHandler} className='absolute right-2 top-10'>
					<PasswordLock width='30px' height='30px' />
				</button>
			) : (
				<button type='button' onClick={onPasswordHandler} className='absolute right-2 top-10'>
					<PasswordUnlock width='30px' height='30px' />
				</button>
			)}
		</div>
	);
};
