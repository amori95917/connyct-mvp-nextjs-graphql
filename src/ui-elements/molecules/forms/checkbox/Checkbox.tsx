import { forwardRef } from 'react';
import { classNames } from '@/utils/classnames';
import { Checkbox, CheckboxProps, Label } from 'src/ui-elements/atoms/forms';

export type FormCheckboxProps = {
	name: string;
	label?: string | React.ReactNode;
	helperText?: string | React.ReactNode;
	wrapperClassName?: string;
	inputClassName?: string;
	labelClassName?: string;
} & Omit<CheckboxProps, 'name'>;

export const FormCheckbox: React.FC<FormCheckboxProps> = forwardRef<
	HTMLInputElement,
	FormCheckboxProps
>(
	(
		{ id, name, label, helperText, inputClassName, labelClassName, wrapperClassName = '', ...props },
		ref
	) => {
		return (
			<div className={classNames('', wrapperClassName)} aria-live='polite'>
				{label && <Label id={id} className={labelClassName} label={label} />}
				<Checkbox id={id} name={name} inputClassName={inputClassName} ref={ref} {...props} />
				{helperText && typeof helperText === 'string' ? (
					<p className='italic text-gray-600 text-xs'>{helperText}</p>
				) : (
					helperText
				)}
			</div>
		);
	}
);

FormCheckbox.displayName = 'FormCheckbox';
