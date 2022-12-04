import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { FormInput, FormTextArea } from '@/shared-components/forms';
import { schema } from './schema';
import { initialValues } from './initialValues';
import { PolicyFormFields } from './types';
import { Pills } from '@/shared-components/pills';

const PolicyForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<PolicyFormFields>({
		mode: 'onSubmit',
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});
	const onSubmit = handleSubmit(async input => {
		console.log('input', input);
	});
	const handlePolicyClick = (policy: PolicyFormFields) => {
		if (policy) {
			const { name, description } = policy;
			setValue('name', name);
			setValue('description', description);
		}
	};
	return (
		<>
			<div className='policy-form'>
				<form onSubmit={onSubmit} className='md:px-3'>
					<p className='font-semibold mb-8 text-gray-600 text-xl'>Create a policy</p>
					<p className='font-bold mb-2 text-gray-600 text-md'>You can select example policy</p>
					<div className='flex flex-wrap gap-2 mb-4 suggested-policies'>
						{SUGGESTED_POLICIES.map(policy => {
							return (
								<Pills key={policy.id} onClick={() => handlePolicyClick(policy)}>
									<Pills.Text>
										<p className='cursor-pointer font-bold'>{policy.name}</p>
									</Pills.Text>
								</Pills>
							);
						})}
					</div>
					<div className='w-full'>
						<FormInput
							name={`name`}
							id='name'
							label='Title*'
							className='pr-5'
							placeholder='Write a policy'
							register={register}
							errors={errors}
						/>
					</div>
					<div className='w-full'>
						<FormTextArea
							name='description'
							id='description'
							label='Description'
							placeholder='Add details to your policy'
							register={register}
							errors={errors}
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default PolicyForm;

const SUGGESTED_POLICIES = [
	{
		id: 1,
		name: 'Be kind and courteous',
		description:
			"We're all in this together to create a Welcoming environment. Let's treat everyone with respect. Healthy debates are natural, but kindness is required.",
	},
	{
		id: 2,
		name: 'No hate speech or bullying',
		description:
			"Make sure everyone feels safe. Bullying of any kind isn't allowed, and degrading comments about things like race, religion, culture, sexual orientation, gender or identity will not be tolerated.",
	},
	{
		id: 3,
		name: 'No promotions or spam',
		description:
			"Give more than you take in this group. Self-promotion, spam and irrelevant links aren't allowed.",
	},
	{
		id: 4,
		name: "Respect everyone's privacy",
		description:
			"Being part of this group requires mutual trust. Authentic, expressive discussions make groups great, but may also be sensitive and private. What's shared in the group should stay in the group.",
	},
];
