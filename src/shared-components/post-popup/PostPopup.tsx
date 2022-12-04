import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { FormTextArea, FormSelect } from '@/shared-components/forms';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { Controller } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '@/graphql/company';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { BiImages } from 'react-icons/bi';
import { BsCameraVideo } from 'react-icons/bs';
import { BsCalendar3Event } from 'react-icons/bs';
import { RiStockLine } from 'react-icons/ri';
import { useClickOutside } from '@/hooks/useClickOutside';
// import { HashTagPopup } from './hash-tag-popup/HashTagPopup';
import { GET_COMPANY_POST } from '@/graphql/feeds';
// import { PostHastag } from '@/components/ui/shared-components/hash-tag/PostHastag';
import produce from 'immer';

const MAX_FILE_SIZE = 10000000;

const acceptedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

const verifyFile = files => {
	if (files && files.length > 0) {
		const { type: currentFileType, size: currentFileSize } = files[0];
		if (currentFileSize > MAX_FILE_SIZE) {
			return false;
		}
		if (!acceptedFiles.includes(currentFileType)) {
			return false;
		}
		return true;
	}
};

export const PostPopup = React.forwardRef(({ company, setShowPostPopup, visitedCompany }, ref) => {
	const [rerender, setRerender] = useState(true);
	const [showHashTagPopup, setShowHashTagPopup] = useState(false);
	const { setIsClose, isClose } = useClickOutside();
	const [hashTags, setHashTags] = useState([]);
	const [postActionType, setPostActionType] = useState('images');
	const {
		register,
		control,
		handleSubmit,
		reset,
		setValue,
		getValues,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
	});

	const handleOnDrop = files => {
		if (files && files.length > 0) {
			const isVerifiedFile = verifyFile(files);
			if (isVerifiedFile) {
				const currentFile = files;
				setValue(
					'images',
					getValues('images') ? [...getValues('images'), ...currentFile] : [...currentFile]
				);
				setRerender(!rerender);
			}
		}
	};

	const [post, { error, loading, data }] = useMutation(CREATE_POST);

	const onSubmit = handleSubmit(async input => {
		const cookie = Cookies.get('CONNYCT_USER') || 'undefined';
		const { company } = JSON.parse(cookie);
		const { tags = [], images = [], ...rest } = input;

		const tempTags = tags
			? tags?.map(tag => {
					return tag.value;
			  })
			: [];
		try {
			const response = await post({
				variables: {
					companyId: company[0].id,
					data: {
						text: input.status,
						tags: tempTags || [],
					},
					file: input.images,
				},

				update: (cache, { data: { post } }) => {
					// post.post
					const companyPosts = cache.readQuery({
						query: GET_COMPANY_POST,
						variables: { id: company[0].id, first: 4 },
					});
					const updatedCompanyPosts = produce(companyPosts, (draft: any) => {
						if (draft?.postsByCompanyId?.edges) {
							draft.postsByCompanyId.edges.push({
								__typename: 'PostEdge',
								cursor: post.post.id,
								node: {
									...post.post,
									comments: [],
								},
							});
						}
					});
					cache.writeQuery({
						query: GET_COMPANY_POST,
						variables: { id: company[0].id, first: companyPosts?.postsByCompanyId?.edges.length + 1 },
						data: updatedCompanyPosts,
					});
				},
			});
			setShowPostPopup(false);
		} catch (err) {}
	});

	const onHashTagClickHandler = () => {
		setShowHashTagPopup(true);
		setIsClose(true);
	};

	const handlePostAction = (type = 'images') => {
		setPostActionType(type);
	};

	const onSelectedImageRemoveHandler = removedImage => {
		setValue(
			'images',
			getValues('images').filter(image => image !== removedImage)
		);

		setRerender(!rerender);
	};

	const postButtonClassName =
		'flex justify-around p-2 rounded-full w-32 cursor-pointer hover:bg-gray-300';

	return (
		<div className='items-center justify-center popup'>
			{/* {showHashTagPopup && isClose && (
				<HashTagPopup
					setShowHashTagPopup={setShowHashTagPopup}
					ref={ref}
					setHashTags={setHashTags}
					hashTags={hashTags}
				/>
			)} */}
			<div ref={ref} className='bg-white relative rounded-md md:w-6/12'>
				<div className='flex items-center justify-between p-2 px-5 rounded-t-md shadow-sm text-gray-600 text-lg'>
					<button
						className='p-1 rounded-md hover:bg-gray-300'
						onClick={() => {
							setShowPostPopup(false);
						}}>
						<AiOutlineClose size={20} />
					</button>
					<span>Create Post</span>
					{/* <button
							type='submit'
							form='create-post-form-id'
							className='bg-primary p-1 rounded-md text-white w-28'>
							Post
						</button> */}
					<button
						className='bg-primary block flex font-semibold h-10 items-center justify-center px-3 py-3 rounded-lg text-white w-32 w-full w-full hover:bg-indigo-700 focus:bg-indigo-700'
						type='submit'
						title={'post'}
						form={'create-post-form-id'}>
						Post
					</button>
				</div>
				<form className='' id='create-post-form-id' onSubmit={onSubmit}>
					<div className='flex flex-wrap min-h-[320px] w-full'>
						<div className='bg-gray-50 h-40 p-2 relative w-full md:h-auto md:w-1/2'>
							{/* <span
									className={`absolute bg-gray-200 p-2 rounded-md z-50 hover:bg-gray-300 ${
										getValues('images')?.length ? '' : 'hidden'
									}`}>
									Add more image
								</span>{' '} */}
							<div className='flex flex-1 h-full image-upload-section no-scrollbar overflow-auto px-2 w-full md:block'>
								<Controller
									name='images'
									control={control}
									errors={errors}
									render={({ field: { onChange, onBlur, name, ref } }) => {
										return (
											<div className={`flex flex-col h-full ${getValues('images')?.length ? 'hidden' : ''}`}>
												<div className='h-full sm:flex'>
													<Dropzone onDrop={handleOnDrop}>
														{({ getRootProps, getInputProps }) => (
															<div className='flex flex-col h-full items-center px-px py-2 w-full'>
																<section className='bg-gray-200 border border-dashed border-slate-400 h-full rounded-md w-full'>
																	<div className='h-full items-center w-full' {...getRootProps()}>
																		<input className='' {...getInputProps()} />
																		<div className='flex flex-col h-full items-center justify-center p-3'>
																			<MdOutlineAddPhotoAlternate fill='#666' size={30} />
																			<p className='text-gray-400'>Click or drag and drop it here</p>
																		</div>
																	</div>
																</section>
															</div>
														)}
													</Dropzone>
												</div>
											</div>
										);
									}}
								/>

								{getValues('images')?.length
									? getValues('images').map((image: any, index: any) => {
											return (
												<div className='flex h-full min-w-min mr-2 mt-5 relative w-full' key={index}>
													<button
														type='button'
														onClick={() => onSelectedImageRemoveHandler(image)}
														className='-mr-2 -mt-2 absolute bg-gray-300 flex h-6 items-center justify-center outline outline-4 outline-offset-0 outline-white right-0 rounded-full w-6 z-50'>
														<AiOutlineClose size={20} />
													</button>
													<Image
														src={URL.createObjectURL(image)}
														fill
														sizes='10/10'
														className='overflow-hidden rounded-md'
														alt='new img'
													/>
												</div>
											);
									  })
									: ''}
							</div>
						</div>
						<div className='p-2 w-full md:w-1/2'>
							<div className='flex flex-col h-full justify-between'>
								<div className='flex flex-col h-full'>
									<div className='flex items-center'>
										<div className=''>
											<Image
												className='rounded-full'
												width={45}
												height={45}
												src='https://i.pravatar.cc'
												alt='Sunset in the mountains'
											/>
										</div>
										<div className='flex flex-col font-semibold items-start ml-5 text-lg whitespace-nowrap'>
											{company[0].legalName}{' '}
											{/* <button
										type='button'
										className='bg-slate-200 border-1 border-gray-200 border-solid p-1 px-3 rounded-sm text-sm'>
										Public
									</button> */}
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
											defaultValue={''}
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
					{/* <div className='flex flex-col'>
						<div className='flex'>
							<Image
								className='rounded-full'
								width={70}
								height={70}
								src='https://i.pravatar.cc'
								alt='Sunset in the mountains'
							/>
							<div className='flex flex-col font-bold items-start ml-5 text-xl'>
								{company[0].legalName}{' '}
								<button
									type='button'
									className='bg-slate-200 border-2 border-black border-solid p-1 px-2 rounded-md text-md'>
									everyone
								</button>
							</div>
						</div>
						<div className='grow'>
							<FormTextArea
								id='status-id'
								name='status'
								atomClassName={'bg-white resize-none h-14 p-3 rounded-md w-full'}
								className=''
								register={register}
								errors={errors}
								placeholder='Say something that inspires'
							/>
						</div>
						<div className='grid grid-cols-5 h-24 no-scrollbar overflow-y-scroll'>
							<Controller
								name='images'
								control={control}
								errors={errors}
								render={({ field: { onChange, onBlur, name, ref } }) => {
									return (
										<div className='flex flex-col'>
											<div className='sm:flex'>
												<Dropzone onDrop={handleOnDrop}>
													{({ getRootProps, getInputProps }) => (
														<section className='bg-gray-200 border-2 border-black border-solid h-24 h-full p-2 rounded-md w-24'>
															<div
																className='border-2 border-black border-dashed h-full rounded-md'
																{...getRootProps()}>
																<input className='' {...getInputProps()} />
																<div className='flex justify-center mt-5'>
																	<MdOutlineAddPhotoAlternate fill='#94a3b8' size={30} />
																</div>
															</div>
														</section>
													)}
												</Dropzone>
											</div>
										</div>
									);
								}}
							/>

							{getValues('images')?.length
								? getValues('images').map((image, index) => {
										return (
											<div className='' key={index}>
												<Image
													src={URL.createObjectURL(image)}
													width={88}
													height={88}
													className='rounded-md'
													alt='new img'
												/>
											</div>
										);
								  })
								: ''}
						</div>
					</div> */}
					{/* <div className='h-8 mt-4 overflow-hidden'>
						{hashTags?.map((tag, index) => {
							return <PostHastag key={index} text={tag} />;
						})}
					</div> */}
					<div className='bg-slate-100 h-px mt-1 w-full'></div>
					<div className='pr-5'></div>
					<div className='flex justify-between p-2 w-full'>
						<button
							type='button'
							onClick={() => handlePostAction('images')}
							className={`${postButtonClassName} ${postActionType === 'images' && 'text-green-400'}`}>
							<BiImages fill='#50c7a6' size={25} /> Photos
						</button>
						<button
							type='button'
							onClick={() => handlePostAction('videos')}
							className={`${postButtonClassName} ${postActionType === 'videos' && 'text-green-400'}`}>
							<BsCameraVideo fill='#EB4D89' size={25} /> Videos
						</button>
						<button
							type='button'
							onClick={() => handlePostAction('events')}
							className={`${postButtonClassName} ${postActionType === 'events' && 'text-green-400'}`}>
							<BsCalendar3Event fill='#5abff8' size={20} /> Events
						</button>
						<button
							type='button'
							onClick={() => handlePostAction('promotions')}
							className={`${postButtonClassName} ${postActionType === 'promotions' && 'text-green-400'}`}>
							<RiStockLine fill='#5abff8' size={25} /> Promotions
						</button>
						<button
							type='button'
							onClick={() => handlePostAction('products')}
							className={`${postButtonClassName} ${postActionType === 'products' && 'text-green-400'}`}>
							<MdOutlineProductionQuantityLimits fill='#DCA3F7' size={25} /> Products
						</button>
					</div>
				</form>
			</div>
		</div>
	);
});

PostPopup.displayName = 'PostPopup';
