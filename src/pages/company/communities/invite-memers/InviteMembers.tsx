import { CreatorContainer } from '@/shared-components/creator-container';
import { FormCheckbox, FormInput } from '@/ui-elements/molecules/forms';

const suggestedMembers = [
	{ id: 1, name: 'Kiran Budathoki', avatar: 'https://i.pravatar.cc' },
	{ id: 2, name: 'Joseff Regmi', avatar: 'https://i.pravatar.cc' },
	{ id: 3, name: 'Abiral Khanal', avatar: 'https://i.pravatar.cc' },
	{ id: 4, name: 'Rafin Karki', avatar: 'https://i.pravatar.cc' },
	{ id: 5, name: 'Aditya Pokharel', avatar: 'https://i.pravatar.cc' },
	{ id: 6, name: 'Tushant Khatiwada', avatar: 'https://i.pravatar.cc' },
];

const InviteMembers = () => {
	return (
		<>
			<p className='font-semibold mb-10 text-gray-600 text-xl'>Invite members</p>
			<div className='w-full'>
				<div className='grid grid-cols-2 h-100'>
					<div className='members-list pr-4'>
						<FormInput id='member-search' name='member-search' placeholder='Search followers' />
						{suggestedMembers.map(member => {
							return (
								<div key={member.id}>
									<div className='flex items-center justify-between pt-4'>
										<div className='user'>
											<CreatorContainer avatar={member.avatar} fullName={member.name} />
										</div>
										<div className='checkbox'>
											<FormCheckbox id='member-select' name='member-select' />
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className='bg-gray-300 p-4'>
						<p className='text-gray-800 text-md'>1 member selected</p>
						<div className='flex items-center justify-between pt-4'>
							<div className='user'>
								<CreatorContainer avatar={'https://i.pravatar.cc'} fullName={'Kiran Budathoki'} />
							</div>
							<div className='remove'>
								<button
									type='button'
									className='bg-transparent inline-flex items-center p-1.5 right-2.5 rounded-lg text-gray-400 text-sm top-2.5 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900'>
									<svg
										aria-hidden='true'
										className='h-5 w-5'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fill-rule='evenodd'
											d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
											clip-rule='evenodd'></path>
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

export default InviteMembers;
