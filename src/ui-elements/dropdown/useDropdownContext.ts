import React from 'react';

import { DropdownContext } from './context';

export const useDropdownContext = () => {
	const context = React.useContext(DropdownContext);
	if (!context) {
		throw new Error('Dropdown compound component should be within the scope of Dropdown component');
	}
	return context;
};
