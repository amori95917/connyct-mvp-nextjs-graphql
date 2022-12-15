import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineClose, AiOutlineCloudUpload } from 'react-icons/ai';

import { FormEditor, FormInput, FormRadio, FileInput } from '@/shared-components/forms';
import { useMutation } from '@apollo/client';
import { CREATE_COMMUNITY, GET_COMMUNITIES, EDIT_COMMUNITY } from '@/graphql/community';
// import { FormDropFile } from '@/shared-components/forms/drop-file/FormDropFIle';
import { acceptedImagesFileTypes } from '@/constants/acceptedFileTypes';
import { verifyFile } from '@/utils/verifyFile';

import { schema } from './schema';
import { getInitialValues, initialValues } from './initialValues';
import { useDropzone } from 'react-dropzone';
import { CommunityFormFields, CommunityFormPropsTypes } from './types';
import { CoverPhotoUploadForm } from '@/shared-components/cover-photo-upload-form';

const CommunityForm: React.FC<CommunityFormPropsTypes> = ({
	setIsOpen,
	companySlug,
	community,
}) => {
	const {
		register,
		control,
		handleSubmit,
		reset,
		setValue,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<CommunityFormFields>({
		mode: 'onSubmit',
		resolver: yupResolver(schema),
		defaultValues: community || initialValues,
	});
	const [rerender, setRerender] = useState(false);
	const [profileImage, setProfileImage] = useState<File[]>();

	const [createCommunity, { loading }] = useMutation(CREATE_COMMUNITY);
	const [editCommunity, { loading: editLoading }] = useMutation(EDIT_COMMUNITY);

	const onSubmit = handleSubmit(async input => {
		console.log(input);
		const { coverPicture: cover, profile, ...restInput } = input;

		if (!community?.id) {
			try {
				const response = await createCommunity({
					variables: {
						input: { ...restInput, companyId: companySlug },
						profile: profile?.[0],
						cover: cover?.[0],
					},
					refetchQueries: [{ query: GET_COMMUNITIES, variables: { companyId: companySlug } }],
				});

				if (response) {
					setIsOpen(false);
					reset();
				}
			} catch (e) {
				console.log(e, '####');
			}
		} else {
			try {
				const response = await editCommunity({
					variables: {
						communityId: community.id,
						input: { ...restInput },
						profile: profile?.[0],
						cover: cover?.[0],
					},
					refetchQueries: [{ query: GET_COMMUNITIES, variables: { companyId: community.id } }],
				});

				if (response) {
					setIsOpen(false);
					reset();
				}
			} catch (e) {
				console.log(e, '####');
			}
		}
	});

	// TODO make a single logic to handle the both uploads

	//cover photo
	const onDrop = (files: File[]) => {
		console.log('cover picture called');
		if (files && files.length > 0) {
			const isVerifiedFile = verifyFile(files, acceptedImagesFileTypes, 1000000);
			if (isVerifiedFile) {
				const currentFile = files;
				setValue('coverPicture', currentFile);
				setRerender(!rerender);
			}
		}
	};

	const onDropProfilePicture = (files: File[]) => {
		if (files && files.length > 0) {
			const isVerifiedFile = verifyFile(files, acceptedImagesFileTypes, 1000000);
			if (isVerifiedFile) {
				const currentFile = files;
				setValue('profile', currentFile);
				setProfileImage(currentFile);
				setRerender(!rerender);
			}
		}
	};

	const { getRootProps, getInputProps } = useDropzone({ onDrop: onDropProfilePicture });

	const onSelectedImageRemoveHandler = removedImage => {
		reset();
	};

	const getProfilePicture = () => {
		if (typeof profileImage === 'string') {
			return profileImage;
		} else if (typeof profileImage === 'object') {
			return URL.createObjectURL(profileImage?.[0]);
		} else {
			return 'https://i.pravatar.cc';
		}
	};

	return (
		<>
			<form onSubmit={onSubmit} className='md:px-3'>
				<p className='font-semibold mb-10 text-gray-600 text-xl'>Create a new community</p>
				<FileInput
					label='Upload profile picture of community'
					control={control}
					name={'profile'}
					multiple={false}
					defaultValue={community?.profile}
					value={community?.profile}
					uploadComponent={
						<>
							<div className='bg-gray-100 h-28 overflow-hidden relative rounded-full w-28 hover:brightness-50'>
								<div className='flex h-full items-center justify-center rounded-md w-full'>
									<AiOutlineCloudUpload size={25} />
								</div>
							</div>
						</>
					}
					labelClassName='mt-4'
					errors={errors}
				/>
				{/* <p className='flex font-semibold items-center mb-2 text-gray-700 text-sm tracking-wide uppercase'>
					Upload profile picture of community
				</p>
				<div
					className='bg-gray-100 h-40 overflow-hidden relative rounded-full w-40 hover:brightness-50'
					{...getRootProps()}>
					<Image src={getProfilePicture()} alt='Image' fill />
					<input
						className='bg-light-bg cursor-pointer flex h-full items-center justify-center rounded-full w-full'
						{...getInputProps()}
					/>
					<div className='flex h-full items-center justify-center rounded-md w-full'>
						<AiOutlineCloudUpload size={25} />
					</div>
				</div> */}
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
							name='type'
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
							name='type'
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
				{getValues('coverPicture')?.length
					? getValues('coverPicture').map((image: any, index: any) => {
							return (
								<div className='h-72 mt-5 relative rounded-md w-96' key={index}>
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
				{/* {!getValues('coverPicture')?.length && (
					<>
						<label className='flex font-semibold items-center mb-0 mt-4 text-gray-700 text-sm tracking-wide uppercase'>
							Cover photo
						</label>
						<div className='bg-gray-100 cursor-pointer flex h-72 justify-center mt-5 p-5 rounded-md w-96'>
							<FormDropFile
								label={'Cover picture'}
								control={control}
								name={'coverPicture'}
								errors={errors}
								onDrop={onDrop}
								isHidden={false}
							/>
						</div>
						<p className='block text-left text-red-600 text-sm'>{errors?.profilePicture?.message}</p>
					</>
				)} */}
				<FileInput
					label='Cover photo'
					control={control}
					name={'coverPicture'}
					multiple={false}
					defaultValue={community?.coverPicture}
					uploadComponent={<CoverPhotoUploadForm />}
					labelClassName='mt-4'
					errors={errors}
				/>
				<div className='flex justify-center mb-5 mt-5'>
					<button
						disabled={isSubmitting}
						className='bg-primary p-3 rounded-md text-white text-xl w-full disabled:opacity-50'>
						{isSubmitting ? 'Submitting' : community?.id ? 'Edit Community' : 'Add Community'}
					</button>
				</div>
				<div className='p-5'></div>
			</form>
		</>
	);
};

export default CommunityForm;
