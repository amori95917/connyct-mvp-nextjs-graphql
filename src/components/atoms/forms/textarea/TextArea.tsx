import React, { FC, forwardRef, DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import classnames from 'classnames';

export type InputSize = 'medium' | 'large';
export type InputType = 'text' | 'email' | 'date' | 'password';

export type TextAreaProps = {
	id: string;
	name: string;
	type?: InputType;
	size?: InputSize;
	className?: string;
	inputClassName?: string;
} & Omit<DetailedHTMLProps<TextareaHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in InputSize]: string } = {
	medium: 'p-3 text-base',
	large: 'p-4 text-base',
};

export const TextArea: FC<TextAreaProps> = forwardRef<HTMLInputElement, TextAreaProps>(
	(
		{
			id,
			name,
			type = 'text',
			inputClassName = '',
			size = 'medium',
			className = '',
			placeholder,
			...props
		},
		ref
	) => {
		return (
			<>
				<textarea
					id={id}
					ref={ref}
					name={name}
					type={type}
					placeholder={placeholder}
					className={
						inputClassName
							? `${inputClassName} relative appearance-none block w-full transition-colors ease-in-out border rounded py-3 mb-3 leading-tight focus:outline-none disabled:cursor-not-allowed disabled:opacity-40`
							: classnames([
									'relative appearance-none block w-full transition-colors ease-in-out bg-gray-200 text-gray-700 rounded py-3 px-3 mb-3 leading-tight focus:outline-none disabled:cursor-not-allowed disabled:opacity-40',
									sizeMap[size],
									className,
							  ])
					}
					{...props}
				/>
			</>
		);
	}
);

TextArea.displayName = 'TextArea';
