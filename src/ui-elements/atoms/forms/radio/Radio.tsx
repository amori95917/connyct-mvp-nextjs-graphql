import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import { classNames } from '@/utils/classnames';

export type RadioProps = {
	inputClassName?: string;
	value?: string | boolean | any;
	id: string;
	name: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, ''>;

export const Radio: React.FC<RadioProps> = forwardRef<HTMLInputElement, RadioProps>(
	({ inputClassName = '', id, name, ...props }, ref) => {
		// const ref = useRef<HTMLInputElement>(null);
		// useImperativeHandle(inRef, () => ref.current!, [ref])
		const _class =
			'form-check-input appearance-none h-6 w-6 rounded-full checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer';
		return (
			<input
				name={name}
				ref={ref}
				className={classNames(_class, inputClassName)}
				type='radio'
				id={id}
				{...props}
			/>
		);
	}
);

Radio.displayName = 'Radio';
