import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UilTimes } from '@iconscout/react-unicons';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormDropFile } from '@/shared-components/forms/drop-file/FormDropFIle';
import { verifyFile } from '@/utils/verifyFile';
import { acceptedImagesFileTypes } from '@/constants/acceptedFileTypes';

import { CitizenshipUploadFields } from '../types';
import { CitizenshipUploadInitialValues } from '../initialValues';
import { CitizenshipUploadValidationSchema } from '../validationSchema';

export const CitizenshipUploadForm = ({ data, setIsDrawerOpen }) => {
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
	} = useForm<CitizenshipUploadFields>({
		mode: 'onSubmit',
		defaultValues: CitizenshipUploadInitialValues ?? {},
		resolver: yupResolver(CitizenshipUploadValidationSchema),
	});

	const onDrop = (files: [], name: 'citizenshipFront' | 'citizenshipBack') => {
		if (files && files.length > 0) {
			const isVerifiedFile = verifyFile(files, acceptedImagesFileTypes, 1000000);
			if (isVerifiedFile) {
				const currentFile = files;
				setValue(name, currentFile);
				setRerender(!rerender);
			}
		}
	};

	const onSubmit = handleSubmit(async input => {
		setIsDrawerOpen(false);
		console.log(input, 'input');
	});

	const onSelectedImageRemoveHandler = (type: string) => {
		if (type === 'front') {
			setValue('citizenshipFront', null);
			setRerender(!rerender);
		} else if (type === 'back') {
			setValue('citizenshipBack', null);
		}

		setRerender(!rerender);
	};

	const buttonClass =
		'bg-primary block font-semibold  px-3 py-3 rounded-lg text-white  absolute bottom-10 right-10 hover:bg-primary focus:bg-primary';
	return (
		<>
			<form onSubmit={onSubmit}>
				<p className='font-semibold mb-4 text-xl'>Documents</p>
				<div className='w-full'>
					{getValues('citizenshipFront')?.length
						? getValues('citizenshipFront').map((image: any, index: any) => {
								return (
									<div className='h-72 relative rounded-md w-full' key={index}>
										<button
											type='button'
											onClick={() => onSelectedImageRemoveHandler('front')}
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

				<div className='mt-5 w-full'>
					{getValues('citizenshipBack')?.length
						? getValues('citizenshipBack').map((image: any, index: any) => {
								return (
									<div className='h-72 relative rounded-md w-full' key={index}>
										<button
											type='button'
											onClick={() => onSelectedImageRemoveHandler('back')}
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

				{!getValues('citizenshipFront')?.length && (
					<>
						<div className='bg-gray-100 cursor-pointer flex h-72 justify-center mt-5 p-5 rounded-md'>
							<FormDropFile
								control={control}
								name={'citizenshipFront'}
								errors={errors}
								onDrop={(file: []) => onDrop(file, 'citizenshipFront')}
								isHidden={false}
							/>
						</div>
						<span className='italic text-gray-600 text-xs'>Upload a clear photo of your document.</span>
						<p className='bold italic text-gray-600 text-md'>Citizenship Front</p>
						<p className='block text-left text-red-600 text-sm'>{errors?.citizenshipFront?.message}</p>
					</>
				)}

				{!getValues('citizenshipBack')?.length && (
					<>
						<div className='bg-gray-100 cursor-pointer flex h-72 justify-center mt-5 p-5 rounded-md'>
							<FormDropFile
								control={control}
								name={'citizenshipBack'}
								errors={errors}
								onDrop={(file: []) => onDrop(file, 'citizenshipBack')}
								isHidden={false}
							/>
						</div>
						<span className='italic text-gray-600 text-xs'>Upload a clear photo of your document.</span>
						<p className='bold italic text-gray-600 text-md'>Citizenship Back</p>
						<p className='block text-left text-red-600 text-sm'>{errors?.citizenshipBack?.message}</p>
					</>
				)}
				<div className='flex gap-2 justify-end mb-5 mt-4 w-full'>
					<button className={buttonClass}>Submit</button>
				</div>
			</form>
		</>
	);
};
