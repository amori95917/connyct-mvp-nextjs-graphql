import { Controller } from 'react-hook-form';

import { FileUpload, FileUploadProps, File } from './FileUpload';

export interface FileInputProps extends FileUploadProps {
	control: any;
	initialValues?: File[];
	errors: any;
}

export const FileInput = (props: FileInputProps) => {
	const { name, control, setValue, initialValues, errors, renderUpload, renderPreview, ...rest } =
		props;
	return (
		<>
			<Controller
				name={name}
				control={control}
				defaultValue={initialValues}
				render={({ field }) => {
					console.log('field', field);
					const { onChange, onBlur, value } = field;
					console.log('value', value);
					return (
						<FileUpload
							{...rest}
							name={name}
							errors={errors}
							onChange={({ name, acceptedFile }) => {
								console.log('name ------->', acceptedFile);
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
