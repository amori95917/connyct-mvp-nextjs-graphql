import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { UilImages, UilVideoQuestion, UilShoppingBag, UilTimes } from '@iconscout/react-unicons';

import { FormTextArea, FormSelect, FileInput } from '@/shared-components/forms';
// import { useClickOutside } from '@/hooks/useClickOutside';
// import { HashTagPopup } from './hash-tag-popup/HashTagPopup';
// import { PostHastag } from '@/components/ui/shared-components/hash-tag/PostHastag';
import {
	BrandFeedUploadForm,
	BrandFeedUploadPreview,
} from '../feed-components/brand-feeds/BrandFeedUpload';
import { Avatar } from '../avatar';

export const PostPopup = React.forwardRef(
	({ company, setShowPostPopup, handlePostSubmit, currentUser }, ref) => {
		// const [showHashTagPopup, setShowHashTagPopup] = useState(false);
		// const { setIsClose, isClose } = useClickOutside();
		// const [hashTags, setHashTags] = useState([]);
		const [postActionType, setPostActionType] = useState('images');
		const {
			register,
			control,
			handleSubmit,
			watch,
			formState: { errors },
		} = useForm({
			mode: 'onSubmit',
			defaultValues: {
				images: [],
				status: '',
				tags: [],
			},
		});

		const onSubmit = handleSubmit(async input => {
			handlePostSubmit(input, () => setShowPostPopup(false));
		});

		// const onHashTagClickHandler = () => {
		// 	// setShowHashTagPopup(true);
		// 	setIsClose(true);
		// };

		const handlePostAction = (type = 'images') => {
			setPostActionType(type);
		};

		const postButtonClassName =
			'flex justify-around p-2 rounded-full w-32 cursor-pointer hover:bg-gray-300';

		const images = watch('images');

		return (
			<div className='items-center justify-center popup'>
				<div ref={ref} className='bg-white relative rounded-md md:w-6/12'>
					<div className='flex items-center justify-between p-2 px-5 rounded-t-md shadow-sm text-gray-600 text-lg'>
						<button
							className='p-1 rounded-md hover:bg-gray-300'
							onClick={() => {
								setShowPostPopup(false);
							}}
						>
							<UilTimes size={20} />
						</button>
						{/* TODO: use FileInput and on renderUpload have button as a component and do not use renderPreview */}
						{images?.length > 0 && <span>Add more images</span>}
						<span>Create Post</span>
						<button
							className='bg-primary flex font-semibold h-10 items-center justify-center px-3 py-3 rounded-lg text-white w-32 w-full w-full hover:bg-indigo-700 focus:bg-indigo-700'
							type='submit'
							title={'post'}
							form={'create-post-form-id'}
						>
							Post
						</button>
					</div>
					<form className='' id='create-post-form-id' onSubmit={onSubmit}>
						<div className='flex flex-wrap min-h-[320px] w-full'>
							<div className='bg-gray-50 h-40 p-2 relative w-full md:h-auto md:w-1/2'>
								<div className='flex flex-1 h-full image-upload-section no-scrollbar overflow-auto px-2 w-full md:block'>
									<FileInput
										label=''
										control={control}
										name={'images'}
										multiple={true}
										initialValues={[]}
										wrapperClassName='h-full'
										previewClassName='h-full'
										uploadFormClassName='h-full'
										maxFiles={5}
										renderUpload={(onDrop, files) => {
											return <BrandFeedUploadForm onDrop={onDrop} files={files} />;
										}}
										renderPreview={(files, handleRemove) => {
											return <BrandFeedUploadPreview files={files} handleRemove={handleRemove} />;
										}}
										labelClassName='mt-4'
										errors={errors}
									/>
								</div>
							</div>
							<div className='p-2 w-full md:w-1/2'>
								<div className='flex flex-col h-full justify-between'>
									<div className='flex flex-col h-full'>
										<div className='flex items-center'>
											<div className='h-16 relative w-16'>
												<Avatar
													className='rounded-full'
													imgSrc={company[0]?.avatar}
													name={company[0]?.name || company[0].legalName}
													alt={company[0]?.name || company[0].legalName || 'brand-avatar'}
												/>
											</div>
											<div className='flex flex-col font-semibold items-start ml-5 text-lg whitespace-nowrap'>
												{company[0].legalName}
											</div>
										</div>
										<div className='h-full py-5'>
											<FormTextArea
												id='status-id'
												name='status'
												inputClassName={'bg-white resize-none h-full p-3 rounded-md w-full'}
												className='h-full'
												register={register}
												errors={errors}
												placeholder='Have something to share for your community?'
											/>
										</div>
									</div>

									<div className='tags'>
										<div className='flex items-center'>
											{/* <p className='font-medium text-gray-600 text-md'>Tags:</p> */}
											<FormSelect
												id='tags'
												disabled={false}
												label={'Tags'}
												helperText={''}
												name={'tags'}
												register={register}
												error={errors}
												placeholder={'Search'}
												options={[{ label: 'tag1', value: 'tag1' }]}
												className={'w-full bg-white'}
												labelClassName={''}
												wrapperClassName={'w-full px-2 bg-white'}
												control={control}
												isCreateable={true}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='bg-slate-100 h-px mt-1 w-full'></div>
						<div className='pr-5'></div>
						<div className='flex justify-between p-2 w-full'>
							<button
								type='button'
								onClick={() => handlePostAction('images')}
								className={`${postButtonClassName} ${postActionType === 'images' && 'text-green-400'}`}
							>
								<UilImages fill='#50c7a6' size={25} /> Photos
							</button>
							<button
								type='button'
								onClick={() => handlePostAction('videos')}
								className={`${postButtonClassName} ${postActionType === 'videos' && 'text-green-400'}`}
							>
								<UilVideoQuestion fill='#EB4D89' size={25} /> Videos
							</button>
							<button
								type='button'
								onClick={() => handlePostAction('products')}
								className={`${postButtonClassName} ${postActionType === 'products' && 'text-green-400'}`}
							>
								<UilShoppingBag fill='#DCA3F7' size={25} /> Products
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
);

PostPopup.displayName = 'PostPopup';
