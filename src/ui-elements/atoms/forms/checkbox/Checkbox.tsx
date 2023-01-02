import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import classnames from 'classnames';

export type CheckboxProps = {
	inputClassName?: string;
	id: string;
	name: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, ''>;

export const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
	({ inputClassName = '', id, name, ...props }, ref) => {
		// const ref = useRef<HTMLInputElement>(null);
		// useImperativeHandle(inRef, () => ref.current!, [ref])
		const _class =
			'form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-gray-200 checked:bg-primary checked:border-primary focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer';
		return (
			<input
				name={name}
				ref={ref}
				className={classnames(inputClassName, _class)}
				type='checkbox'
				value=''
				id={id}
				{...props}
			/>
		);
	}
);

Checkbox.displayName = 'Checkbox';
