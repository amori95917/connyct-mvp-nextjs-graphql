import React from 'react';
import classNames from 'classnames';

import { BoxProps } from './types';

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
	({ children, as = 'div', className = '', ...rest }, ref) => {
		const Element = as;
		const defaultClassNames = 'bg-white rounded-md w-full';
		return (
			<Element ref={ref} className={classNames(defaultClassNames, className)} {...rest}>
				{children}
			</Element>
		);
	}
);

Box.displayName = 'Box';

export default Box;
