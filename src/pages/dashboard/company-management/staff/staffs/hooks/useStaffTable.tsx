import React from 'react';

import { AvatarCell, StatusPill, SelectColumnFilter } from '../commons';
import getData from '../data';

const useStaffTable = () => {
	const columns = React.useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
			},
			{
				Header: 'Name',
				accessor: 'name',
				Cell: AvatarCell,
				imgAccessor: 'image',
				emailAccessor: 'email',
			},
			{
				Header: 'Email',
				accessor: 'email',
			},
			{
				Header: 'Team',
				accessor: 'team',
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: StatusPill,
			},
			// {
			//   Header: "Role",
			//   accessor: 'role',
			//   Filter: SelectColumnFilter,
			//   filter: 'includes',
			// },
		],
		[]
	);

	const data = React.useMemo(() => getData(), []);
	return { columns, data };
};

export default useStaffTable;
