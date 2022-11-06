import { BsThreeDotsVertical } from 'react-icons/bs';
import { Dropdown as DropdownElement } from '@/ui-elements/dropdown';
import { FaRegFlag } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';

export const Dropdown = () => {
	return (
		<>
			<DropdownElement>
				<div className='relative'>
					<DropdownElement.Action>
						{(isActive: boolean) => {
							return (
								<>
									<BsThreeDotsVertical />
								</>
							);
						}}
					</DropdownElement.Action>
					<DropdownElement.Menu>
						<div className='absolute bg-white border border-gray-200 border-solid flex flex-col mt-2 right-0 rounded-md shadow-xl z-10'>
							<span className='flex items-center p-2 rounded-md w-full hover:bg-gray-200'>
								<DropdownElement.Option>
									<FiEdit2 className='mr-2' />
									Edit
								</DropdownElement.Option>
							</span>
							<span className='flex items-center p-2 rounded-md hover:bg-gray-200'>
								<DropdownElement.Option>
									<FaRegFlag className='mr-2' /> Report
								</DropdownElement.Option>
							</span>
						</div>
					</DropdownElement.Menu>
				</div>
			</DropdownElement>
		</>
	);
};
