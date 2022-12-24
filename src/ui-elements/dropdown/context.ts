import React from 'react';
import { DropdownContextValue } from './types';

export const DropdownContext = React.createContext<DropdownContextValue>({
	handleToggle: () => {},
	isToggle: false,
});

// {
// 	isToggle: false,
// 	handleToggle: () => {},
// }
