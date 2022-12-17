import Dropzone from 'react-dropzone';
import { UilCloudUpload } from '@iconscout/react-unicons';

export const DropFile = ({ onDrop }: any) => {
	return (
		<Dropzone onDrop={onDrop}>
			{({ getRootProps, getInputProps }) => (
				<div className='flex items-center justify-center w-full' {...getRootProps()}>
					<input {...getInputProps()} />
					<p className='flex justify-center mt-3'>
						<UilCloudUpload fill='#2599c0' size={100} />
					</p>
				</div>
			)}
		</Dropzone>
	);
};
