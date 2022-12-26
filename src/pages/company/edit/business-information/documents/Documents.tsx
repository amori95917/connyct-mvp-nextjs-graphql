import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { UilCloudUpload } from '@iconscout/react-unicons';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';

import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';
import { verifyFile } from '@/utils/verifyFile';
import { acceptedImagesFileTypes } from '@/constants/acceptedFileTypes';
import { COMPANY_AVATAR_MUTATION, GET_COMPANY } from '@/graphql/company/resolver';

import { RegistrationUploadForm } from './RegistrationUploadForm';
import { PanOrVatUploadFrom } from './PanOrVatUploadFrom';
import { buttonClass, disabledButtonClass } from '../../common/constants';
import { DocumentsProps } from '../types';

const uploadFormTypes = {
	citizenship: 'citizenshipDoc',
	registration: 'registrationDoc',
	panOrVat: 'panOrVatDoc',
};

const Documents: React.FC<DocumentsProps> = props => {
	const { companySlug, submitCompletedRoute, data, setSubmitCompletedRoute } = props;
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [showFormType, setShowFormType] = useState<string>('');
	const [avatarFile, setAvatarFile] = useState();
	const [avatarFileError, setAvatarFileError] = useState('');

	const [avatarCreate, { loading, error }] = useMutation(COMPANY_AVATAR_MUTATION);

	const onDrop = async (files: []) => {
		if (files && files.length > 0) {
			const isVerifiedFile = verifyFile(files, acceptedImagesFileTypes, 5000000);
			if (isVerifiedFile) {
				setAvatarFile(files?.[0]);
				try {
					const response = await avatarCreate({
						variables: {
							companyId: companySlug,
							avatar: files?.[0],
						},
						refetchQueries: [{ query: GET_COMPANY, variables: { id: companySlug } }],
					});
					if (response?.data) {
						console.log(response);
					}
				} catch (err: any) {
					console.log(err);
				}
			} else {
				setAvatarFileError('Image must be valid a Image and size must be less than 5 MB');
			}
		}
	};

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const onClickHandler = (formType: string) => {
		setIsDrawerOpen(!isDrawerOpen);
		setShowFormType(formType);
	};

	const getProfilePicture = () => {
		if (avatarFile) {
			return URL.createObjectURL(avatarFile);
		} else if (data?.getCompanyById?.avatar) {
			return data.getCompanyById.avatar;
		} else {
			return 'https://i.pravatar.cc';
		}
	};

	return (
		<>
			<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
				{showFormType === uploadFormTypes.panOrVat && (
					<PanOrVatUploadFrom data={data} setIsDrawerOpen={setIsDrawerOpen} companySlug={companySlug} />
				)}
				{showFormType === uploadFormTypes.registration && (
					<RegistrationUploadForm
						companySlug={companySlug}
						data={data}
						setIsDrawerOpen={setIsDrawerOpen}
					/>
				)}
			</RightDrawerLayout>

			<div className='documents-upload'>
				<h1 className='font-bold text-gray-600'>Upload document</h1>
				<p className='mt-1 text-gray-400'>Upload PAN or VAT</p>
				<div className='mt-6 upload-section'>
					<div className='flex uploads-row md:flex-row'>
						<div
							onClick={() => onClickHandler(uploadFormTypes.panOrVat)}
							className='bg-light-bg cursor-pointer flex flex-col items-center p-10 rounded text-center w-full md:w-1/4'>
							<svg
								className='h-6 mr-1 text-current-50 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
								/>
							</svg>
							<p className='mt-2 text-gray-600'>Click to upload your document like PAN or VAT</p>
						</div>
						{data?.getCompanyById?.companyDocument?.map(aDocument => {
							const { id, document, type } = aDocument;
							if (type === 'VAT')
								return (
									<div
										key={id}
										className='bg-white flex flex-col items-center p-10 relative rounded shadow-md text-center w-full md:ml-6 md:w-1/4'>
										<Image src={document || ''} alt={'doc'} fill />
									</div>
								);
						})}
					</div>
				</div>
				<p className='mt-5 text-gray-400'>Upload Company Registration</p>
				<div className='mt-6 upload-section'>
					<div className='flex uploads-row md:flex-row'>
						<div
							onClick={() => onClickHandler(uploadFormTypes.registration)}
							className='bg-light-bg cursor-pointer flex flex-col items-center p-10 rounded text-center w-full md:w-1/4'>
							<svg
								className='h-6 mr-1 text-current-50 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
								/>
							</svg>
							<p className='mt-2 text-gray-600'>Upload registration Document</p>
						</div>
						{data?.getCompanyById?.companyDocument?.map(aDocument => {
							const { id, document, type } = aDocument;
							if (type === 'COMPANY_REGISTRATION')
								return (
									<div
										key={id}
										className='bg-white flex flex-col items-center p-10 relative rounded shadow-md text-center w-full md:ml-6 md:w-1/4'>
										<Image src={document || ''} alt={'doc'} fill />
									</div>
								);
						})}
					</div>
				</div>
			</div>
			<div className='mt-10 profile-image-upload'>
				<h1 className='font-bold text-gray-600'>Upload logo</h1>
				<p className='mt-1 text-gray-400'>Upload your company logo</p>
				<div className='mt-6 upload-section'>
					<form>
						<div
							className='bg-gray-100 h-40 overflow-hidden relative rounded-full w-40 hover:brightness-50'
							{...getRootProps()}>
							<Image src={getProfilePicture()} alt='Image' fill />
							<input
								className='bg-light-bg cursor-pointer flex h-full items-center justify-center rounded-full w-full'
								{...getInputProps()}
							/>
							<div className='flex h-full items-center justify-center rounded-md w-full'>
								<UilCloudUpload size={25} />
							</div>
						</div>
					</form>
					{avatarFileError && <p className='text-red-400'>{avatarFileError}</p>}
					<div className='flex gap-2 justify-end mb-5 mt-4 w-full'>
						<Link href={`/brand/${companySlug}/edit/business-information/general`}>
							<button type='button' className={buttonClass}>
								Previous
							</button>
						</Link>
						<Link href={`/brand/${companySlug}/edit/business-information/branches`}>
							<button type='button' className={buttonClass}>
								Continue
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Documents;
