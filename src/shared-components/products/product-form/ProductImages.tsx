import { CoverPhotoUploadForm } from '@/shared-components/cover-photo-upload-form';
import { FileInput } from '@/shared-components/forms';
import Image from 'next/image';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { UilTimes } from '@iconscout/react-unicons';

type ProductImagesProps = {
	control: any;
	errors: any;
};

const ProductImages = (props: ProductImagesProps) => {
	const { errors, control } = props;
	// const { control, setValue } = useForm();
	return (
		<>
			<FileInput
				label='Upload Product Photos'
				name='media'
				multiple={true}
				maxFiles={5}
				control={control}
				initialValues={[]}
				renderUpload={(onDrop, files, handleRemove) => {
					console.log('files', files);
					return (
						<Dropzone onDrop={onDrop}>
							{({ getRootProps, getInputProps }) => (
								<section>
									<div {...getRootProps()}>
										<input {...getInputProps()} />
										<CoverPhotoUploadForm />
									</div>
								</section>
							)}
						</Dropzone>
					);
				}}
				renderPreview={(files, handleRemove) => {
					console.log('PREVIEW', files);
					return (
						<>
							{files.length > 0 &&
								files.map(file => {
									return (
										<div className='file-preview relative' key={file.name}>
											<Image
												src={file.preview}
												alt={file.name || 'product-photo'}
												width={200}
												height={200}
												className='object-cover relative rounded-md'
											/>
											<span
												onClick={() => handleRemove(file)}
												className='absolute cursor-pointer font-extrabold right-0 text-primary top-0'>
												<UilTimes size={24} />
											</span>
										</div>
									);
								})}
						</>
					);
				}}
				labelClassName='mt-4'
				errors={errors}
			/>
		</>
	);
};

export default ProductImages;
