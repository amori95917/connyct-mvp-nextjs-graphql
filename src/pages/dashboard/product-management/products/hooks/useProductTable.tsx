import React from 'react';

import { AvatarCell, StatusPill, SelectColumnFilter } from '../commons';
import getData from '../data';

const useProductTable = () => {
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
				Header: 'Brand',
				accessor: 'brand',
			},
			{
				Header: 'Price',
				accessor: 'price',
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: StatusPill,
			},
			{
				Header: 'Code',
				accessor: 'code',
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

export default useProductTable;
