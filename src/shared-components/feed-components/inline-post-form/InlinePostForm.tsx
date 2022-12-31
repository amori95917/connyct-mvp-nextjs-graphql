import { User } from '@/generated/graphql';
import { Avatar } from '@/shared-components/avatar';
import { FormInputField } from '@/shared-components/forms/input/Input';
import { getUserImageFromRole, getUserNameFromRole } from '@/utils/permissions';
import { useForm } from 'react-hook-form';

type InlinePostFormProps = {
	authorizedUser: User;
	onFormSubmit: (val: any, cb: any) => void;
	name: string;
	placeholder?: string;
};
const InlinePostForm = (props: InlinePostFormProps) => {
	const { authorizedUser, onFormSubmit, placeholder = '', name } = props;
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({});
	const onSubmit = handleSubmit(val => onFormSubmit(val, () => reset({ name: '' })));
	return (
		<>
			<div className='flex gap-4 pt-2'>
				<Avatar
					imgSrc={getUserImageFromRole(authorizedUser)}
					name={getUserNameFromRole(authorizedUser) || ''}
					alt={getUserNameFromRole(authorizedUser) || ''}
					className='rounded-full'
				/>
				<form onSubmit={onSubmit} className='w-full'>
					<FormInputField
						type='text'
						name={name}
						id={name}
						placeholder={placeholder}
						inputClassName='rounded-full'
						className='rounded-full'
						register={register}
						errors={errors}
					/>
				</form>
			</div>
		</>
	);
};

export default InlinePostForm;
