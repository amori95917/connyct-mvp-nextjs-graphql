import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UilTimes } from '@iconscout/react-unicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';

import { FormDropFile } from '@/shared-components/forms/drop-file/FormDropFIle';
import { verifyFile } from '@/utils/verifyFile';
import { acceptedImagesFileTypes } from '@/constants/acceptedFileTypes';
import { FormInput } from '@/shared-components/forms';
import { DOCUMENT_MUTATION, GET_COMPANY } from '@/graphql/company/resolver';

import { DocumentUploadProps } from './types';
import { DocumentsFormFields } from '../types';
import { documentsRegistrationFormInitialValues } from '../initialValues';
import { documentsFormValidationSchema } from '../validationSchema';

export const RegistrationUploadForm: React.FC<DocumentUploadProps> = ({
	companySlug,
	data,
	setIsDrawerOpen,
}) => {
	const [rerender, setRerender] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		getValues,
		watch,
		reset,
		formState: { errors },
	} = useForm<DocumentsFormFields>({
		mode: 'onSubmit',
		defaultValues: documentsRegistrationFormInitialValues(data) ?? {},
		resolver: yupResolver(documentsFormValidationSchema),
	});

	const onDrop = (files: File[]) => {
		if (files && files.length > 0) {
			const isVerifiedFile = verifyFile(files, acceptedImagesFileTypes, 1000000);
			if (isVerifiedFile) {
				const currentFile = files;
				setValue('documentFile', currentFile);
				setRerender(!rerender);
			}
		}
	};

	const [registrationDoc, { loading, error }] = useMutation(DOCUMENT_MUTATION);

	const onSubmit = handleSubmit(async input => {
		try {
			const response = await registrationDoc({
				// TODO document type is required update after api updates
				variables: {
					input: {
						companyId: companySlug,
						type: input.documentType,
					},
					document: input.documentFile,
				},
				refetchQueries: [{ query: GET_COMPANY, variables: { id: companySlug } }],
			});
			// Need to handle this properly
			if (response?.data) {
				console.log(response);
				setIsDrawerOpen(false);
			}
		} catch (err: any) {
			console.log(err);
		}
	});

	const onSelectedImageRemoveHandler = removedImage => {
		reset();
	};

	const buttonClass =
		'bg-primary block font-semibold  px-3 py-3 rounded-lg text-white  absolute bottom-10 right-10 hover:bg-primary focus:bg-primary';
	return (
		<>
			<form onSubmit={onSubmit}>
				<p className='font-semibold mb-4 text-xl'>Documents</p>
				<div className='w-full'>
					{getValues('documentFile')?.length
						? getValues('documentFile').map((image: any, index: any) => {
								return (
									<div className='h-72 relative rounded-md w-full' key={index}>
										<button
											type='button'
											onClick={() => onSelectedImageRemoveHandler(image)}
											className='-mr-2 -mt-2 absolute bg-gray-300 flex h-6 items-center justify-center outline outline-4 outline-offset-0 outline-white right-0 rounded-full w-6 z-50'>
											<UilTimes size={20} />
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
				</div>

				{!getValues('documentFile')?.length && (
					<>
						<div className='bg-gray-100 cursor-pointer flex h-72 justify-center mt-5 p-5 rounded-md'>
							<FormDropFile
								control={control}
								name={'documentFile'}
								errors={errors}
								onDrop={onDrop}
								isHidden={false}
							/>
						</div>
						<span className='italic text-gray-600 text-xs'>Upload a clear photo of your document.</span>
						<p className='block text-left text-red-600 text-sm'>{errors?.documentFile?.message}</p>
					</>
				)}

				<div className='mt-10'>
					<FormInput
						name='documentType'
						id='document'
						label='Document Type'
						register={register}
						errors={errors}
						placeholder='Enter your document type.(Registration Paper)'
						helperText='We will use this document to verify your company.'
						disabled
					/>
				</div>

				<div className='flex gap-2 justify-end mb-5 mt-4 w-full'>
					<button className={buttonClass}>Continue</button>
				</div>
			</form>
		</>
	);
};
