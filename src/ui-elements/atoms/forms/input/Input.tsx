import classnames from 'classnames';
import { DetailedHTMLProps, FC, forwardRef, InputHTMLAttributes } from 'react';

export type InputSize = 'medium' | 'large';
export type InputType = 'text' | 'email' | 'date' | 'password';

export type InputProps = {
	id: string;
	name: string;
	type?: InputType;
	size?: InputSize;
	className?: string;
	atomClassName?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in InputSize]: string } = {
	medium: 'p-3 text-base',
	large: 'p-4 text-base',
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			id,
			name,
			type = 'text',
			size = 'medium',
			atomClassName = '',
			className = '',
			placeholder,
			...props
		},
		ref
	) => {
		return (
			<>
				<input
					id={id}
					ref={ref}
					name={name}
					type={type}
					placeholder={placeholder}
					className={classnames([
						atomClassName
							? atomClassName
							: 'relative appearance-none block w-full transition-colors ease-in-out bg-gray-200 text-gray-700 border rounded py-4 px-3 mb-2 leading-tight focus:outline-none disabled:cursor-not-allowed disabled:opacity-40',
						sizeMap[size],
						className,
					])}
					{...props}
				/>
			</>
		);
	}
);

Input.displayName = 'Input';
