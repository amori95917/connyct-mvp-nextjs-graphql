import React from 'react';
import { Controller, DeepMap, FieldError } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { ContentEditor } from '@/shared-components/editor';
import { FormErrorMessage } from '../form-error-message';

type EditorControlProps<TFormValues> = {
	name: string;
	id: string;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
	label?: string | React.ReactNode;
	helperText?: string | React.ReactNode;
	labelClassName?: string;
	placeholder?: string;
	control: any;
};

const Editor = <TFormValues extends Record<string, unknown>>({
	name,
	errors,
	label,
	helperText,
	labelClassName,
	placeholder,
	control,
	id,
}: EditorControlProps<TFormValues>) => {
	// const { errors } = useFormState({
	// 	control,
	// });
	return (
		<>
			<Controller
				name={name}
				defaultValue=''
				control={control}
				render={({ field: { value, onChange } }) => (
					// It doesnt work
					// Cause string !== EditorState type
					<ContentEditor
						id={id}
						value={value}
						onChange={onChange}
						label={label}
						labelClassName={labelClassName}
						helperText={helperText}
						placeholder={placeholder}
					/>
				)}
			/>
			<ErrorMessage
				errors={errors}
				name={name as any}
				render={({ message }) => <FormErrorMessage className=''>{message}</FormErrorMessage>}
			/>
		</>
	);
};

export default Editor;
