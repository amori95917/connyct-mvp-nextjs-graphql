export const DiscussionActionsDropdown = () => {
	return (
		<>
			<div
				id='dropdown'
				className='absolute bg-white divide-gray-100 divide-y rounded shadow w-44 z-10 dark:bg-gray-700'
			>
				<ul className='py-1 text-gray-700 text-sm dark:text-gray-200' aria-labelledby='dropdownDefault'>
					<li>
						<a
							href='#'
							className='block px-4 py-2 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-100'
						>
							Edit
						</a>
					</li>
					<li>
						<a
							href='#'
							className='block px-4 py-2 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-100'
						>
							Report
						</a>
					</li>
				</ul>
			</div>
		</>
	);
};
