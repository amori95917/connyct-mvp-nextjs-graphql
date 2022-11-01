import React, { FC, forwardRef } from 'react';

import { classNames } from '@/utils/classnames';
import { TextArea, TextAreaProps, Label } from '@/components/atoms/forms';

export type FormInputProps = {
	name: string;
	label?: string | React.ReactNode;
	helperText?: string | React.ReactNode;
	inputClassName?: string;
	labelClassName?: string;
} & Omit<TextAreaProps, 'name'>;

export const FormTextArea: FC<TextAreaProps> = forwardRef<HTMLInputElement, FormInputProps>(
	({ id, name, label, helperText, className, inputClassName, labelClassName, ...props }, ref) => {
		// If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
		return (
			<div className={classNames('', className)} aria-live='polite'>
				{label && <Label id={id} className={labelClassName} label={label} />}
				<TextArea
					ref={ref}
					id={id}
					name={name}
					inputClassName={inputClassName}
					className={classNames(
						'border-red-600 transition-colors hover:border-red-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-red-600'
					)}
					{...props}
				/>
				{helperText && typeof helperText === 'string' ? (
					<p className='italic text-gray-600 text-xs'>{helperText}</p>
				) : (
					helperText
				)}
			</div>
		);
	}
);

FormTextArea.displayName = 'FormTextArea';
