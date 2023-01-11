import { Avatar } from '../avatar';

const MessageWidget = () => {
	return (
		<>
			<div className='antialiased fixed flex flex-row h-full overflow-y right-0 text-gray-800 top-16 w-1/2 z-50'>
				<div className='bg-white flex flex-row flex-shrink-0 p-4 shadow-sm w-72'>
					<div className='-mr-4 flex flex-col h-full pl-4 pr-4 py-4 w-full'>
						<div className='flex flex-row items-center'>
							<div className='flex flex-row items-center'>
								<div className='font-semibold text-xl'>Messages</div>
								<div className='bg-primary flex font-medium h-5 items-center justify-center ml-2 rounded-full text-white text-xs w-5'>
									5
								</div>
							</div>
							<div className='ml-auto'>
								<button className='bg-gray-200 flex h-7 items-center justify-center rounded-full text-gray-500 w-7'>
									<svg
										className='h-4 stroke-current w-4'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
									</svg>
								</button>
							</div>
						</div>
						<div className='mt-5 participants'>
							<div className='-mx-4 flex flex-col'>
								<div className='flex flex-row items-center p-4 relative'>
									<div className='absolute mr-4 mt-3 right-0 text-gray-500 text-xs top-0'>5 min</div>
									<Avatar
										imgSrc={''}
										name='Kiran'
										alt='Kiran'
										className='flex flex-shrink-0 h-10 items-center justify-center w-10'
									/>
									<div className='flex flex-col flex-grow ml-3'>
										<div className='font-medium text-sm'>kiran</div>
										<div className='text-xs truncate w-40'>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?
										</div>
									</div>
									<div className='flex-shrink-0 mb-1 ml-2 self-end'>
										<span className='bg-primary flex h-5 items-center justify-center rounded-full text-white text-xs w-5'>
											5
										</span>
									</div>
								</div>
								<div className='bg-gradient-to-r border-brandSecondary border-l-2 flex flex-row from-brandSecondary items-center p-4 to-transparent'>
									<Avatar
										imgSrc={''}
										name='Abiral'
										alt='Abiral'
										className='flex flex-shrink-0 h-10 items-center justify-center w-10'
									/>
									<div className='flex flex-col flex-grow ml-3'>
										<div className='flex items-center'>
											<div className='font-medium text-sm'>Abiral</div>
											<div className='bg-green-500 h-2 ml-2 rounded-full w-2'></div>
										</div>
										<div className='text-xs truncate w-40'>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='bg-gray-100 flex flex-col h-full px-4 w-full'>
					<div className='active-participant bg-primary flex flex-row items-center px-6 py-4 rounded-2xl shadow'>
						<Avatar imgSrc={''} name='Abiral' alt='Abiral' />
						<div className='flex flex-col ml-3'>
							<div className='font-semibold text-sm text-white'>Abiral</div>
							<div className='text-green-400 text-xs'>Active</div>
						</div>
					</div>
					<div className='h-full messages overflow-hidden py-4'>
						<div className='h-full overflow-y-auto'>
							<div className='gap-y-2 grid grid-cols-12'>
								<div className='col-end-8 col-start-1 p-3 rounded-lg'>
									<div className='flex flex-row items-center'>
										<Avatar
											imgSrc={''}
											name='Abiral'
											alt='Abiral'
											className='flex flex-shrink-0 h-10 items-center justify-center w-10'
										/>
										<div className='bg-brandSecondary ml-3 px-4 py-2 relative rounded-xl shadow text-sm text-white'>
											<div>Hey How are you today?</div>
										</div>
									</div>
								</div>
								<div className='col-end-8 col-start-1 p-3 rounded-lg'>
									<div className='flex flex-row items-center'>
										<Avatar imgSrc={''} name='Abiral' alt='Abiral' />
										<div className='bg-brandSecondary ml-3 px-4 py-2 relative rounded-xl shadow text-sm text-white'>
											<div>Do you have speciaility beans coffee?</div>
										</div>
									</div>
								</div>
								<div className='col-end-13 col-start-6 p-3 rounded-lg'>
									<div className='flex flex-row items-center'>
										<Avatar imgSrc={''} name='Kiran' alt='Kiran' />
										<div className='bg-primary ml-3 px-4 py-2 relative rounded-xl shadow text-sm text-white'>
											<div>We have only on light profile. Will that work for you?</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-row items-center send-message'>
						<div className='border flex flex-row h-12 items-center px-2 rounded-3xl w-full'>
							<button className='flex h-10 items-center justify-center ml-1 text-gray-400 w-10'>
								<svg
									className='h-5 w-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'></path>
								</svg>
							</button>
							<div className='w-full'>
								<input
									type='text'
									className='border border-transparent flex h-10 items-center text-sm w-full focus:outline-none'
									placeholder='Type your message....'
								/>
							</div>
							<div className='flex flex-row'>
								<button className='flex h-10 items-center justify-center text-gray-400 w-8'>
									<svg
										className='h-5 w-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'></path>
									</svg>
								</button>
								<button className='flex h-10 items-center justify-center ml-1 mr-2 text-gray-400 w-8'>
									<svg
										className='h-5 w-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MessageWidget;
