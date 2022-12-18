const Attribute = ({ data }) => {
	return (
		<>
			<div className='border-b border-gray-100 cursor-pointer py-4 rounded-t shadow-sm w-full hover:bg-gray-100'>
				<div className='flex flex-col'>
					<div className='-mt-1 mx-2'>{data.label}</div>
					<div className='options'>
						<div className='flex'>
							{data?.options.map(option => (
								<div
									key={option.id}
									className='bg-primary border border-primary-300 mt-1 mx-2 px-2 py-1 rounded-full text-white'
								>
									<p className='flex-initial font-normal leading-none max-w-full text-xs'>{option.label}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Attribute;
