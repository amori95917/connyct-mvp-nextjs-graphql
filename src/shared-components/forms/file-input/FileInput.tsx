import { Controller } from 'react-hook-form';

import { FileUpload, FileUploadProps, File } from './FileUpload';

export interface FileInputProps extends FileUploadProps {
	control: any;
	initialValues?: File[];
	errors: any;
}

export const FileInput = (props: FileInputProps) => {
	const { name, control, initialValues, errors, renderUpload, renderPreview, ...rest } = props;
	return (
		<>
			<Controller
				name={name}
				control={control}
				defaultValue={initialValues}
				render={({ field }) => {
					const { onChange, onBlur, value } = field;
					return (
						<FileUpload
							{...rest}
							name={name}
							errors={errors}
							onChange={onChange}
							value={value}
							renderUpload={(onDrop, files, handleRemove) => {
								if (renderUpload) {
									return renderUpload(onDrop, files, handleRemove);
								}
							}}
							renderPreview={(files, onRemove) => {
								if (renderPreview) {
									return renderPreview(files, onRemove);
								}
							}}
						/>
					);
				}}
			/>
		</>
	);
};

export default FileUpload;
