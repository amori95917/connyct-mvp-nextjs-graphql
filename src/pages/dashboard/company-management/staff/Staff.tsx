import Info from '@/pages/dashboard/commons/info';
import { Tabs } from '@/ui-elements/tabs';

import Staffs from './staffs';
import StaffSetup from './staff-setup';

const StaffWrapper = () => {
	return (
		<>
			<Info
				title='Company Management'
				description='In the company management, you can add staffs, list staffs, edit and delete staffs.
						The role will be assigned as per the selected teams'
			/>
			<div className='body pt-4'>
				<Tabs initialActiveTab='staffs'>
					<ul className='border-b-2 border-gray-400 border-solid border-t-transparent border-x-transparent flex'>
						<li className='cursor-pointer font-semibold py-2'>
							<Tabs.Tab label='staffs'>All Staffs</Tabs.Tab>
						</li>
						<li className='cursor-pointer font-semibold px-4 py-2'>
							<Tabs.Tab label='staff-setup'>+ Add New Staff </Tabs.Tab>
						</li>
					</ul>
					<Tabs.Panel label='staffs'>
						<Staffs />
					</Tabs.Panel>
					<Tabs.Panel label='staff-setup'>
						<StaffSetup />
					</Tabs.Panel>
				</Tabs>
			</div>
		</>
	);
};

export default StaffWrapper;
