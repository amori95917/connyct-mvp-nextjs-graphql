import React from 'react';

export type OptionProps = {
	children: React.ReactNode;
};

export type MenuProps = {
	children: React.ReactNode;
};

export type ActionProps = {
	// children: React.ReactNode;
	children: (isToggle: boolean) => React.ReactElement | React.ReactNode;
};

export type DropdownProps = {
	children: React.ReactNode;
	open?: boolean;
};

export type DropdownContextValue = {
	handleToggle: (isToggle: boolean) => void;
	isToggle: boolean;
};
