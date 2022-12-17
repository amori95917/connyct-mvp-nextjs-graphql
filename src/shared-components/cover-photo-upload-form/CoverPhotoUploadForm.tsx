import { UilCloudUpload } from '@iconscout/react-unicons';

const CoverPhotoUploadForm = () => {
	return (
		<div className='flex flex-col h-full justify-center w-full'>
			<p className='flex justify-center mt-3'>
				<UilCloudUpload fill='#2599c0' size={100} />
			</p>
			<p className='flex justify-center text-gray-400 w-full'>
				click here to upload or drag and drop here{' '}
			</p>
		</div>
	);
};

export default CoverPhotoUploadForm;
