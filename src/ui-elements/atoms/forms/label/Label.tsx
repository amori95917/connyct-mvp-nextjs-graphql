import classNames from 'classnames';
import React from 'react';

export type LabelProps = {
	className?: string;
	id: string;
	label: string | React.ReactNode;
};
export const Label = (props: LabelProps) => {
	const { className = '', id, label } = props;
	const defaultClassName =
		'font-semibold flex items-center mb-2 text-gray-700 text-sm tracking-wide uppercase';
	return (
		<label className={classNames(className, defaultClassName)} htmlFor={id}>
			{label}
		</label>
	);
};
