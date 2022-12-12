import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
	useCommunityPolicyCreateMutation,
	useCommunityPolicyUpdateMutation,
} from '@/hooks/services/useCommunityPolicy';
import { FormInput, FormTextArea } from '@/shared-components/forms';
import { schema } from './schema';
import { initialValues } from './initialValues';
import { PolicyFormFields } from './types';
import { Pills } from '@/shared-components/pills';
import { COMMUNITY_POLICIES } from '@/graphql/community';
import { omit } from '@/utils/array';

type DefaultValueProps = {
	id: String;
	title: String;
	description: String;
};

type PolicyFormProps = {
	communitySlug: String;
	onClose: () => void;
	defaultValue?: DefaultValueProps;
};

const PolicyForm = (props: PolicyFormProps) => {
	const { communitySlug, onClose, defaultValue } = props;
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<PolicyFormFields>({
		mode: 'onSubmit',
		resolver: yupResolver(schema),
		defaultValues: defaultValue ? omit(defaultValue, ['id']) : initialValues,
	});
	const { createCommunityPolicy, loading, error } = useCommunityPolicyCreateMutation();
	const {
		updateCommunityPolicy,
		loading: updating,
		error: updateError,
	} = useCommunityPolicyUpdateMutation();
	const onSubmit = handleSubmit(async input => {
		if (defaultValue) {
			await updateCommunityPolicy({
				variables: {
					id: defaultValue.id,
					input: { ...input },
				},
				refetchQueries: [
					{
						query: COMMUNITY_POLICIES,
						variables: {
							communityId: communitySlug,
							first: 10,
						},
					},
				],
			});
		} else {
			await createCommunityPolicy({
				variables: {
					id: communitySlug,
					input: { ...input },
				},
				refetchQueries: [
					{
						query: COMMUNITY_POLICIES,
						variables: {
							communityId: communitySlug,
							first: 10,
						},
					},
				],
			});
		}

		(!error || !updateError) && onClose();
	});
	const handlePolicyClick = (policy: PolicyFormFields) => {
		if (policy) {
			const { title, description } = policy;
			setValue('title', title);
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
										<p className='cursor-pointer font-bold'>{policy.title}</p>
									</Pills.Text>
								</Pills>
							);
						})}
					</div>
					<div className='w-full'>
						<FormInput
							name={`title`}
							id='title'
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
					<div className='absolute bottom-10 flex justify-center pr-5 w-11/12'>
						<button className='bg-primary p-3 rounded-md text-white text-xl w-full'>
							{loading || updating ? 'Submitting' : defaultValue ? 'Update Policy' : 'Submit Policy'}
						</button>
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
		title: 'Be kind and courteous',
		description:
			"We're all in this together to create a Welcoming environment. Let's treat everyone with respect. Healthy debates are natural, but kindness is required.",
	},
	{
		id: 2,
		title: 'No hate speech or bullying',
		description:
			"Make sure everyone feels safe. Bullying of any kind isn't allowed, and degrading comments about things like race, religion, culture, sexual orientation, gender or identity will not be tolerated.",
	},
	{
		id: 3,
		title: 'No promotions or spam',
		description:
			"Give more than you take in this group. Self-promotion, spam and irrelevant links aren't allowed.",
	},
	{
		id: 4,
		title: "Respect everyone's privacy",
		description:
			"Being part of this group requires mutual trust. Authentic, expressive discussions make groups great, but may also be sensitive and private. What's shared in the group should stay in the group.",
	},
];
