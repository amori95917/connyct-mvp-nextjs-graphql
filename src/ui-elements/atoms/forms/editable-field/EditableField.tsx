import React, { FC, forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react';
import classnames from 'classnames';

export type EditableFieldProps = {
	id: string;
	name: string;
	className?: string;
	text?: string;
	isEditable?: boolean;
} & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'size'>;

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

export const EditableField: FC<EditableFieldProps> = forwardRef<HTMLDivElement, EditableFieldProps>(
	({ id, name, isEditable = false, text = '', className = '', ...props }, ref) => {
		return (
			<>
				<div
					id={id}
					ref={ref}
					name={name}
					contentEditable={isEditable}
					suppressContentEditableWarning={true}
					className={classnames(['p-1 rounded-md', className])}
					{...props}
				>
					{text}
				</div>
			</>
		);
	}
);

EditableField.displayName = 'EditableField';
