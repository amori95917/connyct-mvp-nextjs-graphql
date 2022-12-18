import React from 'react';
import { useTabs } from './Tabs';

export interface ITabProps {
	label: string;
}

export const Tab: React.FC<ITabProps> = props => {
	const { setActiveTab } = useTabs();
	return (
		<div className='tab'>
			<p onClick={() => setActiveTab(props.label)}>{props.children}</p>
		</div>
	);
};
