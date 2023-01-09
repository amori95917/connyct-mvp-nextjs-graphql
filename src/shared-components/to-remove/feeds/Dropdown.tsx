import { UilEllipsisV, UilFileEditAlt } from '@iconscout/react-unicons';

import { Dropdown as DropdownElement } from '@/ui-elements/dropdown';

export const Dropdown = () => {
	return (
		<>
			<DropdownElement>
				<div className='relative'>
					<DropdownElement.Action>
						{(isActive: boolean) => {
							return (
								<>
									<UilEllipsisV />
								</>
							);
						}}
					</DropdownElement.Action>
					<DropdownElement.Menu>
						<div className='absolute bg-white border border-gray-200 border-solid flex flex-col mt-2 right-0 rounded-md shadow-xl z-10'>
							<span className='flex items-center p-2 rounded-md w-full hover:bg-gray-200'>
								<DropdownElement.Option>
									<UilFileEditAlt className='mr-2' />
									Edit
								</DropdownElement.Option>
							</span>
							<span className='flex items-center p-2 rounded-md hover:bg-gray-200'>
								<DropdownElement.Option>Report</DropdownElement.Option>
							</span>
						</div>
					</DropdownElement.Menu>
				</div>
			</DropdownElement>
		</>
	);
};
