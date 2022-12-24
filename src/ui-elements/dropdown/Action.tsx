import { ReactElement, cloneElement, isValidElement, Children, useCallback } from 'react';

import { ActionProps } from './types';
import { useDropdownContext } from './useDropdownContext';

export const Action = (props: ActionProps) => {
	const { children } = props;
	const { isToggle, handleToggle } = useDropdownContext();
	const handleClick = useCallback(() => handleToggle(!isToggle), [isToggle, handleToggle]);
	return (
		<div onClick={handleClick}>
			{typeof children === 'function'
				? children(isToggle)
				: Children.map(children, (child: ReactElement<any>) => {
						if (isValidElement(child)) {
							return cloneElement(child, {
								...child.props,
							});
						}
						return '';
				  })}
		</div>
	);
};
