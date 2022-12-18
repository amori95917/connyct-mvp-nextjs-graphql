import Image from 'next/image';

export function AvatarCell({ value, column, row }) {
	return (
		<div className='flex items-center'>
			<div className='flex-shrink-0 h-10 relative w-10'>
				<Image
					className='h-10 rounded-full w-10'
					src={row.original[column.imgAccessor]}
					alt=''
					layout='fill'
					objectFit='cover'
				/>
			</div>
			<div className='ml-4'>
				<div className='font-medium text-gray-900 text-sm'>{value}</div>
				<div className='text-gray-500 text-sm'>{row.original[column.emailAccessor]}</div>
			</div>
		</div>
	);
}
