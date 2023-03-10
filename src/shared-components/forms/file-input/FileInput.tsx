import { Controller } from 'react-hook-form';

import { FileUpload, FileUploadProps, File } from './FileUpload';

export interface FileInputProps extends FileUploadProps {
	control: any;
	initialValues?: File[];
	errors: any;
	renderUpload: (
		onDrop: (acceptedFiles: File[], rejectedFiles: File[]) => void,
		files: File[],
		onRemove: (file: File) => void
	) => React.ReactNode;
	renderPreview: (files: File[], onRemove: (file: File) => void) => React.ReactNode;
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
							onChange={({ name, acceptedFile }) => {
								// return onChange({ name, acceptedFile });
								return onChange(acceptedFile);
							}}
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
