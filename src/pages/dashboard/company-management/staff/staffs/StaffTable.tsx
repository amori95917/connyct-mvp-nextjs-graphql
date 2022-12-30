import {
	useTable,
	useFilters,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
	usePagination,
} from 'react-table';

import { SortIcon, SortDownIcon, SortUpIcon } from '@/ui-elements/atoms/icons';

const StaffTable = ({ columns, data }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using 'rows', we'll use page,
		// which has only the rows for the active page

		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,

		state,
		preGlobalFilteredRows,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
		},
		useFilters, // useFilters!
		useSortBy,
		usePagination // new
	);
	return (
		<div className='flex flex-col mt-4'>
			<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='align-middle inline-block min-w-full py-2 sm:px-6 lg:px-8'>
					<div className='border-b border-gray-200 overflow-hidden shadow sm:rounded-lg'>
						<table {...getTableProps()} className='divide-gray-200 divide-y min-w-full'>
							<thead className='bg-gray-50'>
								{headerGroups.map((headerGroup, id) => (
									<tr {...headerGroup.getHeaderGroupProps()} key={id}>
										{headerGroup.headers.map((column, id) => (
											// Add the sorting props to control sorting. For this example
											// we can add them into the header props
											<th
												scope='col'
												className='font-medium group px-6 py-3 text-gray-500 text-left text-xs tracking-wider uppercase'
												{...column.getHeaderProps(column.getSortByToggleProps())}
												key={id}
											>
												<div className='flex items-center justify-between'>
													{column.render('Header')}
													{/* Add a sort direction indicator */}
													<span>
														{column.isSorted ? (
															column.isSortedDesc ? (
																<SortDownIcon className='h-4 text-gray-400 w-4' />
															) : (
																<SortUpIcon className='h-4 text-gray-400 w-4' />
															)
														) : (
															<SortIcon className='h-4 opacity-0 text-gray-400 w-4 group-hover:opacity-100' />
														)}
													</span>
												</div>
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody {...getTableBodyProps()} className='bg-white divide-gray-200 divide-y'>
								{page.map((row, i) => {
									// new
									prepareRow(row);
									return (
										<tr {...row.getRowProps()} key={i}>
											{row.cells.map((cell, i) => {
												return (
													<td
														key={i}
														{...cell.getCellProps()}
														className='px-6 py-4 whitespace-nowrap'
														role='cell'
													>
														{cell.column.Cell.name === 'defaultRenderer' ? (
															<div className='text-gray-500 text-sm'>{cell.render('Cell')}</div>
														) : (
															cell.render('Cell')
														)}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StaffTable;
