import React, { useState, useMemo, useCallback } from 'react';

import { DropdownProps } from './types';
import { Action } from './Action';
import { Menu } from './Menu';
import { Option } from './Option';
import { DropdownContext } from './context';

// first need a compound component with tow main child component trigger button and dropdown menus container
// button contain the controlling state for opening and closing of the dropdown container
// dropdown container contains further child component these are the options

// coding pattern will be follows

// <Dropdown>
//   <Dropdown.Button> button or icon <Dropdown.Button/>
//   <Dropdown.menu> // option should only be inside menu
//     <Dropdown.Option><Dropdown.Option/>
//     <Dropdown.Option><Dropdown.Option/>
//     <Dropdown.Option><Dropdown.Option/>
//     <Dropdown.Option><Dropdown.Option/>
//     <Dropdown.Option><Dropdown.Option/>
//     <Dropdown.menus/>
// </Dropdown>

export const Dropdown = (props: DropdownProps) => {
	const { children, open = false, ...rest } = props;
	const [isToggle, setIsToggle] = useState(open);
	const handleToggle = useCallback(() => setIsToggle(prevIsToggle => !prevIsToggle), [isToggle]);
	const value = useMemo(
		() => ({
			handleToggle,
			isToggle,
		}),
		[isToggle, handleToggle]
	);

	return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
};

Dropdown.displayName = 'Dropdown';

/* actually Dropdown is an object so here we are creating a property called Action, Menu
	and Option as of now. Since, Dropdown function is an object we can therefore assign a
	property. For example, if obj is an object (obj = {}) then we can assign any property
	with any kind of value like obj.a = 10
*/

Dropdown.Action = Action;
Dropdown.Menu = Menu;
Dropdown.Option = Option;
