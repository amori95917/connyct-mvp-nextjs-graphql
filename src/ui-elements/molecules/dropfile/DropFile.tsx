import Dropzone from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export const DropFile = ({ onDrop }: any) => {
	return (
		<Dropzone onDrop={onDrop}>
			{({ getRootProps, getInputProps }) => (
				<div className='flex items-center justify-center w-full' {...getRootProps()}>
					<input {...getInputProps()} />
					<p className='flex justify-center mt-3'>
						<AiOutlineCloudUpload fill='#2599c0' size={100} />
					</p>
				</div>
			)}
		</Dropzone>
	);
};
