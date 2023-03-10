import React, { FC, forwardRef } from 'react';

import { classNames } from '@/utils/classnames';
import { Input, InputProps, Label } from 'src/ui-elements/atoms/forms';

export type FormInputProps = {
	name: string;
	label?: string | React.ReactNode;
	helperText?: string | React.ReactNode;
	inputClassName?: string;
	labelClassName?: string;
	helperTextClassName?: string;
	id?: string;
} & Omit<InputProps, 'name'>;

export const FormInput: FC<FormInputProps> = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			id,
			name,
			label,
			helperText,
			className,
			inputClassName,
			labelClassName,
			helperTextClassName = '',
			type,
			...props
		},
		ref
	) => {
		return (
			<div className={classNames('relative w-full', className)} aria-live='polite'>
				{label && <Label id={id} className={labelClassName} label={label} />}
				<Input
					id={id}
					name={name}
					type={type}
					ref={ref}
					className={classNames(
						'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50',
						inputClassName
					)}
					{...props}
				/>
				{helperText && typeof helperText === 'string' ? (
					<p className={classNames('italic text-gray-600 text-xs', helperTextClassName)}>{helperText}</p>
				) : (
					helperText
				)}
			</div>
		);
	}
);

FormInput.displayName = 'FormInput';
