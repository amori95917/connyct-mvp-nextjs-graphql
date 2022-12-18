import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormInput, FormRadio } from '@/shared-components/forms';

const initialValues = {
	fullName: '',
	email: '',
	password: '',
	phoneNumber: '',
	team: 'staff' as const,
};

type StaffFormField = {
	fullName: string;
	email: string;
	phoneNumber: string;
	team: string;
};

const schema = yup.object({
	fullName: yup.string().label('Full name').required(),
	email: yup.string().label('Email').required(),
	phoneNumber: yup.string().label('Phone number').required(),
	team: yup.string().label('Team').oneOf(['owner', 'manager', 'editor', 'staff']),
});

const TEAMS = [
	{
		id: 1,
		name: 'Owner',
		value: 'owner',
		description: 'Owner has all the permissions like adding all other type of member',
	},
	{
		id: 2,
		name: 'Manager',
		value: 'manager',
		description: 'Manager has all the permissions except adding owner and manager',
	},
	{
		id: 3,
		name: 'Editor',
		value: 'editor',
		description: 'Editor has permissions on content and what staff role has',
	},
	{
		id: 4,
		name: 'Staff',
		value: 'staff',
		description: 'Staff has permission to communicate and coordinate with customer',
	},
];

const Setup = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<StaffFormField>({
		mode: 'onBlur',
		defaultValues: initialValues ?? {},
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(data => console.log('data', data));

	return (
		<>
			<section className='pt-8 staff-setup-form w-full'>
				<form onSubmit={onSubmit}>
					<div className='gap-3 grid grid-cols-3 lg:pr-12'>
						{TEAMS.map(team => {
							return (
								<div data-id='team-block' key={team.id}>
									<div
										className={`border-solid ${
											getValues('team') === team.value ? 'border-primary' : 'border-gray-100'
										} border-x border-y lg:mb-2`}>
										<div className='flex'>
											<div className='pl-1 radio-select shadow-sm'>
												<FormRadio
													id='team'
													name='team'
													value={team.value}
													className='bg-transparent mb-4 mr-2'
													inputClassName='border-solid border-black border-x border-y'
													register={register}
													errors={errors}
												/>
											</div>
											<div className='content p-4'>
												<h2
													className={`${getValues('team') === team.value ? 'text-primary' : 'text-gray-800'}`}>
													{team.name}
												</h2>
												<p className='py-4 text-gray-400'>{team.description}</p>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<p className='py-6 text-gray-400'>
						In this section, be sure to fill in the necessary information. Once you submit the form, an
						invitation email will be sent to the respective email address. Once the user accepts an
						invitation, she/he will be a member of your company account.
					</p>
					<div className='form-section lg:pr-12'>
						<div className='-mx-3 flex'>
							<div className='mb-5 px-3 w-1/2'>
								<FormInput
									name='fullName'
									id='fullName'
									label='Full name'
									type='text'
									className='mb-4 mr-2'
									register={register}
									errors={errors}
								/>
							</div>
							<div className='mb-5 px-3 w-1/2'>
								<FormInput
									name='email'
									id='email'
									label='Email Address'
									type='email'
									className='mb-4 mr-2'
									register={register}
									errors={errors}
								/>
							</div>
						</div>
						<div className='-mx-3'>
							<div className='mb-5 px-3 w-1/2'>
								<FormInput
									name='phoneNumber'
									id='phoneNumber'
									label='Phone number'
									type='text'
									className='mb-4 mr-2'
									register={register}
									errors={errors}
								/>
							</div>
						</div>

						<div className='-mx-3 flex justify-end'>
							<div className='mb-5 px-3'>
								<button
									type='submit'
									className='bg-primary block font-semibold max-w-xs mx-auto px-3 py-3 rounded-lg text-white w-full'>
									Send Invitation
								</button>
							</div>
							<div className='mb-5 px-3'>
								<button className='bg-transparent block border-2 border-primary border-solid font-medium max-w-xs mx-auto px-3 py-3 rounded-lg text-primary w-full'>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</form>
			</section>
		</>
	);
};

export default Setup;
