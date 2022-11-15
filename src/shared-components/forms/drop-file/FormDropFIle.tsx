import { Controller } from 'react-hook-form';
import { DropFile } from '@/ui-elements/molecules/dropfile/DropFile';

export const FormDropFile = (props: any) => {
	const { name, control, errors, isHidden, onDrop } = props;
	return (
		<Controller
			name={name ? name : 'file'}
			control={control}
			errors={errors}
			render={({ field: { onChange, onBlur, name, ref } }) => {
				return (
					<div className={`h-full flex items-center w-full ${isHidden && 'hidden'}`}>
						<div className='flex flex-col h-full justify-center w-full'>
							<DropFile onDrop={onDrop} />
							<p className='flex justify-center text-gray-400 w-full'>
								{' '}
								click here to upload or drag and drop here{' '}
							</p>
						</div>
					</div>
				);
			}}
		/>
	);
};
