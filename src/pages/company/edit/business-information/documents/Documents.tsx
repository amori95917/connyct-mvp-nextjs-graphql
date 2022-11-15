import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useDropzone } from 'react-dropzone';

import { RightDrawerLayout } from '@/shared-components/layouts/right-drawer-layout';

import { DocumentsForm } from './DocumentsForm';
import CitizenshipUploadForm from './CitizenshipUploadForm';
import { buttonClass, disabledButtonClass } from '../../common/constants';

const Documents = ({ data, companySlug }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [showCitizenshipUploadForm, setShowCitizenshipUploadForm] = useState<boolean>(false);

	const onDrop = (file: []) => {};
	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const onRegistrationUploadClickHandler = () => {
		setIsDrawerOpen(!isDrawerOpen);
		setShowCitizenshipUploadForm(false);
	};

	const onCitizenshipUploadClickHandler = () => {
		setIsDrawerOpen(true);
		setShowCitizenshipUploadForm(true);
	};

	const profilePicture = 'https://i.pravatar.cc';
	return (
		<>
			<RightDrawerLayout isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
				{showCitizenshipUploadForm ? (
					<CitizenshipUploadForm data={data} setIsDrawerOpen={setIsDrawerOpen} />
				) : (
					<DocumentsForm data={data} setIsDrawerOpen={setIsDrawerOpen} />
				)}
			</RightDrawerLayout>

			<div className='documents-upload'>
				<h1 className='font-bold text-gray-600'>Upload document</h1>
				<p className='mt-1 text-gray-400'>Upload PAN or VAT</p>
				<div className='mt-6 upload-section'>
					<div className='flex uploads-row md:flex-row'>
						<div
							onClick={onRegistrationUploadClickHandler}
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
						<div className='bg-white cursor-pointer flex flex-col items-center p-10 rounded shadow-md text-center w-full md:ml-6 md:w-1/4'></div>
					</div>
				</div>
				<p className='mt-1 mt-10 mt-5 text-gray-400'>Upload Citizenship</p>
				<div className='mt-6 upload-section'>
					<div className='flex uploads-row md:flex-row'>
						<div
							onClick={onCitizenshipUploadClickHandler}
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
							<p className='mt-2 text-gray-600'>Upload proprietor Citizenship</p>
						</div>
						<div className='bg-white cursor-pointer flex flex-col items-center p-10 rounded shadow-md text-center w-full md:ml-6 md:w-1/4'></div>
						<div className='bg-white cursor-pointer flex flex-col items-center p-10 rounded shadow-md text-center w-full md:ml-6 md:w-1/4'></div>
					</div>
				</div>
			</div>
			<div className='mt-10 profile-image-upload'>
				<h1 className='font-bold text-gray-600'>Upload logo</h1>
				<p className='mt-1 text-gray-400'>Upload your company logo</p>
				<div className='mt-6 upload-section'>
					<form>
						<div
							className='bg-gray-100 h-40 relative rounded-full w-40 hover:brightness-50'
							{...getRootProps()}>
							{profilePicture && <Image src={profilePicture} className='rounded-full' alt='Image' fill />}
							<input
								className='bg-light-bg cursor-pointer flex h-full items-center justify-center rounded-full w-full'
								{...getInputProps()}
							/>
							<div className='flex flex h-full items-center justify-center rounded-md w-full'>
								<AiOutlineCloudUpload size={25} />
							</div>
						</div>
					</form>

					<div className='flex gap-2 justify-end mb-5 mt-4 w-full'>
						<Link href={`/company/${companySlug}/edit/business-information/general`}>
							<button type='button' className={buttonClass}>
								Previous
							</button>
						</Link>
						<Link href={`/company/${companySlug}/edit/business-information/branches`}>
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
