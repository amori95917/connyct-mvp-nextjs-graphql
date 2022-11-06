import { classNames } from '@/utils/classnames';
import { Radio, RadioProps, Label } from '@/components/atoms/forms';
import { forwardRef } from 'react';

export type FormRadioProps = {
	name: string;
	label?: string | React.ReactNode;
	helperText?: string | React.ReactNode;
	inputClassName?: string;
	labelClassName?: string;
} & Omit<RadioProps, 'name'>;

export const FormRadio: React.FC<FormRadioProps> = forwardRef<HTMLInputElement, FormRadioProps>(
	({ id, name, label, helperText, className, inputClassName, labelClassName, ...props }, ref) => {
		return (
			<div
				className={classNames(
					'appearance-none border border-gray-300 flex h-full items-center rounded-sm w-full',
					className
				)}
				aria-live='polite'>
				<Radio id={id} name={name} ref={ref} className={classNames('', inputClassName)} {...props} />
				{label && <Label id={id} className={labelClassName} label={label} />}
				{helperText && typeof helperText === 'string' ? (
					<p className='italic text-gray-600 text-xs'>{helperText}</p>
				) : (
					helperText
				)}
			</div>
		);
	}
);

FormRadio.displayName = 'FormRadio';
