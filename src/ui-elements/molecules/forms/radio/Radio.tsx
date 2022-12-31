import { classNames } from '@/utils/classnames';
import { Radio, RadioProps, Label } from 'src/ui-elements/atoms/forms';
import { forwardRef } from 'react';

export type FormRadioProps = {
	name: string;
	label?: string | React.ReactNode;
	helperText?: string | React.ReactNode;
	inputClassName?: string;
	labelClassName?: string;
	wrapperClassName?: string;
} & Omit<RadioProps, 'name'>;

export const FormRadio: React.FC<FormRadioProps> = forwardRef<HTMLInputElement, FormRadioProps>(
	(
		{ id, name, label, helperText, wrapperClassName, inputClassName, labelClassName, ...props },
		ref
	) => {
		return (
			<>
				<div
					className={classNames(
						'appearance-none flex h-full items-center p-2 rounded-sm w-full',
						wrapperClassName
					)}
					aria-live='polite'>
					<Radio
						id={id}
						name={name}
						ref={ref}
						inputClassName={classNames('', inputClassName)}
						{...props}
					/>
					{label && <Label id={id} className={labelClassName} label={label} />}
				</div>
				{helperText && typeof helperText === 'string' ? (
					<p className='italic text-gray-600 text-xs'>{helperText}</p>
				) : (
					helperText
				)}
			</>
		);
	}
);

FormRadio.displayName = 'FormRadio';
