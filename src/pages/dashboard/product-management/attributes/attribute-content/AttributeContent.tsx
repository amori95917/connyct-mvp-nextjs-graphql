import { Tabs } from '@/ui-elements/tabs';
import { AttributeList } from './list';
import { AttributeForm } from './form';

const AttributeContent = () => {
	return (
		<>
			<Tabs initialActiveTab='attributes-form'>
				<ul className='border-b-2 border-gray-400 border-solid border-t-transparent border-x-transparent flex'>
					<li className='cursor-pointer font-semibold py-2'>
						<Tabs.Tab label='attributes-list'>Attributes</Tabs.Tab>
					</li>
					<li className='cursor-pointer font-semibold px-4 py-2'>
						<Tabs.Tab label='attributes-form'>+ Add new attribute</Tabs.Tab>
					</li>
				</ul>
				<Tabs.Panel label='attributes-list'>
					<AttributeList />
				</Tabs.Panel>
				<Tabs.Panel label='attributes-form'>
					<AttributeForm />
				</Tabs.Panel>
			</Tabs>
		</>
	);
};

export default AttributeContent;
