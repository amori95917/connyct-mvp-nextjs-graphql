import React from 'react';

import { Tab, ITabProps } from './Tab';
import { Panel, IPanelProps } from './Panel';

interface ITabsContext {
	activeTab: string;
	setActiveTab: (label: string) => void;
}

interface ITabsComposition {
	Tab: React.FC<ITabProps>;
	Panel: React.FC<IPanelProps>;
}

interface ITabsProps {
	initialActiveTab: string;
}

export const TabsContext = React.createContext<ITabsContext | undefined>(undefined);

export const useTabs = (): ITabsContext => {
	const context = React.useContext(TabsContext);
	if (!context) throw new Error('This component must be used within a <Tabs> component.');
	return context;
};

const Tabs: React.FC<ITabsProps> & ITabsComposition = props => {
	const [activeTab, setActiveTab] = React.useState(props.initialActiveTab);
	return (
		<>
			<TabsContext.Provider value={{ activeTab, setActiveTab }}>{props.children}</TabsContext.Provider>
		</>
	);
};

Tabs.Tab = Tab;
Tabs.Panel = Panel;

export { Tabs };
