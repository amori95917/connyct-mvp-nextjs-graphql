import React, { useState } from 'react';

import { ActionProps } from './types';
import { useDropdownContext } from './useDropdownContext';

export const Action = (props: ActionProps) => {
	const { children, ...rest } = props;
	const { isToggle, handleToggle } = useDropdownContext();
	const handleClick = () => handleToggle(!isToggle);
	return (
		<div onClick={handleClick}>
			{typeof children === 'function'
				? React.cloneElement(
						children(isToggle),
						{}
						// {
						// 	className: 'dropdown-action',
						// }

						// I am extending the children you passed me by adding className property from my side. However, I dont know if this can be useful to you or not. I am just giving you a className for now. You do what you want to. By the way, this is the true purpose of using React.cloneElement so thank you for using me.
				  )
				: React.Children.map(children, child => {
						if (React.isValidElement(child)) {
							return React.cloneElement(child, {
								...child.props,
							});
						}
						return '';
				  })}
		</div>
	);
};
