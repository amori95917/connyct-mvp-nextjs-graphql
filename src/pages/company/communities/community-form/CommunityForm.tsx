import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineClose } from 'react-icons/ai';

import { FormEditor, FormInput, FormRadio } from '@/shared-components/forms';
import { useMutation } from '@apollo/client';
import { CREATE_COMMUNITY, GET_COMMUNITY } from '@/graphql/community';
import { FormDropFile } from '@/shared-components/forms/drop-file/FormDropFIle';
import { acceptedImagesFileTypes } from '@/constants/acceptedFileTypes';
import { verifyFile } from '@/utils/verifyFile';

import { schema } from './schema';
import { initialValues } from './initialValues';
import { CommunityFormFields } from './types';

const CommunityForm = ({ setIsOpen, companySlug }) => {
	const {
		register,
		control,
		handleSubmit,
		reset,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<CommunityFormFields>({
		mode: 'onSubmit',
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const [rerender, setRerender] = useState(false);

	const [createCommunity, { loading }] = useMutation(CREATE_COMMUNITY);

	const onSubmit = handleSubmit(async input => {
		const { profilePicture: profile, communityPrivacyType: type, ...restInput } = input;
		console.log(input);
		try {
			const response = await createCommunity({
				variables: {
					input: { ...restInput, type, companyId: companySlug },
					profile: profile[0],
				},
				refetchQueries: [{ query: GET_COMMUNITY, variables: { companyId: companySlug } }],
			});

			if (response) {
				setIsOpen(false);
				reset();
			}
		} catch (e) {
			console.log(e, '####');
		}
	});

	const onDrop = (files: File[]) => {
		if (files && files.length > 0) {
			const isVerifiedFile = verifyFile(files, acceptedImagesFileTypes, 1000000);
			if (isVerifiedFile) {
				const currentFile = files;
				setValue('profilePicture', currentFile);
				setRerender(!rerender);
			}
		}
	};

	const onSelectedImageRemoveHandler = removedImage => {
		reset();
	};

	console.log(getValues('profilePicture'));

	return (
		<>
			<form onSubmit={onSubmit} className='md:px-3'>
				<p className='font-semibold mb-10 text-gray-600 text-xl'>Create a new community</p>
				<div className='w-full'>
					<FormInput
						name={`name`}
						id='name'
						label='Name*'
						className='pr-5'
						placeholder='Name of a community'
						register={register}
						errors={errors}
					/>
				</div>
				<p className='font-semibold mb-4 text-grey-600'>Community Privacy</p>
				<div className='flex mb-5'>
					<div className='w-1/2'>
						<FormRadio
							id='private'
							name='communityPrivacyType'
							labelClassName='mb-0'
							value='PRIVATE'
							label='Private'
							className='mr-2'
							inputClassName='bg-gray-200'
							register={register}
							errors={errors}
							helperText='Only member given access can join.'
						/>
					</div>
					<div className='w-1/2'>
						<FormRadio
							id='public'
							name='communityPrivacyType'
							value='PUBLIC'
							label='Public'
							className='mr-2'
							inputClassName='bg-gray-200'
							labelClassName='mb-0'
							register={register}
							errors={errors}
							helperText='Any of your follower can join this community.'
						/>
					</div>
				</div>
				<div className='w-full md:pt-6'>
					<FormEditor
						id='description'
						name={`description`}
						label='Description*'
						placeholder='Write a description'
						control={control}
						errors={errors}
					/>
				</div>

				{getValues('profilePicture')?.length
					? getValues('profilePicture').map((image: any, index: any) => {
							return (
								<div className='h-72 mt-5 relative rounded-md w-full' key={index}>
									<button
										type='button'
										onClick={() => onSelectedImageRemoveHandler(image)}
										className='-mr-2 -mt-2 absolute bg-gray-300 flex h-6 items-center justify-center outline outline-4 outline-offset-0 outline-white right-0 rounded-full w-6 z-50'>
										<AiOutlineClose size={20} />
									</button>
									<Image
										className='object-cover rounded-md'
										alt='test'
										src={URL.createObjectURL(image)}
										fill
									/>
								</div>
							);
					  })
					: ''}

				{!getValues('profilePicture')?.length && (
					<>
						<div className='bg-gray-100 cursor-pointer flex h-72 justify-center mt-5 p-5 rounded-md'>
							<FormDropFile
								label={'Profile picture'}
								control={control}
								name={'profilePicture'}
								errors={errors}
								onDrop={onDrop}
								isHidden={false}
							/>
						</div>
						<span className='italic text-gray-600 text-xs'>Upload a profile photo.</span>
						<p className='block text-left text-red-600 text-sm'>{errors?.profilePicture?.message}</p>
					</>
				)}

				<div className='absolute bottom-10 flex justify-center pr-5 w-11/12'>
					<button className='bg-primary p-3 rounded-md text-white text-xl w-full'>Add Community</button>
				</div>
			</form>
		</>
	);
};

export default CommunityForm;
