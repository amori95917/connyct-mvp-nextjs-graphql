import Image from 'next/image';
import Dropzone from 'react-dropzone';
import { UilImagePlus, UilTimes } from '@iconscout/react-unicons';

import { File } from '@/shared-components/forms/file-input/FileUpload';

type BrandFeedUploadFormProps = {
	onDrop: (acceptedFiles: File[], rejectedFiles: File[]) => void;
	files: File[];
};

export const BrandFeedUploadForm = (props: BrandFeedUploadFormProps) => {
	const { onDrop, files } = props;
	return (
		<Dropzone onDrop={onDrop} files={files}>
			{({ getRootProps, getInputProps }) => (
				<div className={`${files.length ? '' : 'h-full'}`} {...getRootProps()}>
					<input className='' {...getInputProps()} />
					{!files?.length && (
						<div className='flex flex-col h-full items-center px-px py-2 w-full'>
							<section className='bg-gray-200 border border-dashed border-slate-400 h-full rounded-md w-full'>
								<div className='flex flex-col h-full items-center justify-center p-3'>
									<UilImagePlus fill='#666' size={30} />
									<p className='text-gray-400'>Click or drag and drop it here</p>
								</div>
							</section>
						</div>
					)}
				</div>
			)}
		</Dropzone>
	);
};

type BrandFeedUploadPreviewPropsp = {
	files: File[];
	handleRemove: (file: File) => void;
};

export const BrandFeedUploadPreview = (props: BrandFeedUploadPreviewPropsp) => {
	const { files, handleRemove } = props;
	return (
		<>
			{files?.length > 0 &&
				files.map((file: File) => {
					return (
						<div
							className='flex h-full min-w-min mr-2 mt-5 relative w-full'
							key={file.name || file.preview}
						>
							<button
								type='button'
								onClick={() => handleRemove(file)}
								className='-mr-2 -mt-2 absolute bg-gray-300 flex h-6 items-center justify-center outline outline-4 outline-offset-0 outline-white right-0 rounded-full w-6 z-50'
							>
								<UilTimes size={20} />
							</button>
							<Image
								src={file.preview}
								alt={file.name || 'feed-image'}
								fill
								sizes='10/10'
								className='overflow-hidden rounded-md'
							/>
						</div>
					);
				})}
		</>
	);
};
