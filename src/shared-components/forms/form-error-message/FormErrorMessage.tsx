import React, { FC } from 'react';

import { classNames } from '@/utils/classnames';

export type FormErrorMessageProps = {
	className?: string;
	children: React.ReactNode;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({ children, className }) => (
	<p className={classNames('block text-left text-red-600 text-sm', className)}>{children}</p>
);
