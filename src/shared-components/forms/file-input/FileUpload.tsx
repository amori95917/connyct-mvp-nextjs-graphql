import * as React from 'react';
import classNames from 'classnames';

import { Label } from '@/ui-elements/atoms/forms';

export type File = {
	name?: string;
	preview: string;
	errors?: {
		code: string;
		message: string;
	}[];
};

export type FileUploadProps = {
	accept?: string[];
	error?: string;
	helperText?: string;
	isRequired?: boolean;
	label?: string;
	labelClassName?: string;
	helperTextClassName?: string;
	maxFiles?: number;
	maxSize?: number;
	multiple?: boolean;
	name: string;
	onChange: (name: string, files: File[]) => void;
	validationHandler?: (name: string, error: string) => void;
	value?: File[];
	renderUpload: (
		onDrop: (acceptedFiles: File[], rejectedFiles: File[]) => void,
		files: File[],
		onRemove: (file: File) => void
	) => React.ReactNode;
	renderPreview: (files: File[], onRemove: (file: File) => void) => React.ReactNode;
};

// Move this to reusable not in shared
export const FileUpload = (props: FileUploadProps) => {
	const {
		accept = ['image/*'],
		error = '',
		helperText,
		isRequired = false,
		label,
		labelClassName = '',
		helperTextClassName = '',
		maxFiles = 1,
		maxSize = 8000000,
		multiple = false,
		name,
		onChange,
		validationHandler = () => {},
		value = [],
		renderUpload,
		renderPreview,
	} = props;
	const [files, setFiles] = React.useState(value);

	const onDrop = React.useCallback(
		(acceptedFiles: File[], rejectedFiles: File[]) => {
			if (rejectedFiles && rejectedFiles.length > 0) {
				setFiles(files);
				onChange(name, files);
				rejectedFiles.forEach((file: File) => {
					file.errors?.forEach(err => {
						if (err.code === 'file-invalid-type') {
							validationHandler &&
								validationHandler(name, `Invalid file format. Only allow ${accept.join(', ')}`);
						} else if (err.code === 'file-too-large') {
							const sizeMb = Math.ceil(maxSize / Math.pow(1024, 2));
							validationHandler && validationHandler(name, `File is larger than ${sizeMb} Mb`);
						} else validationHandler && validationHandler(name, err.message);
					});
				});
			} else {
				const acceptedFile = files
					? [
							...files,
							...acceptedFiles.map((file: File) =>
								Object.assign(file, {
									preview: URL.createObjectURL(file),
								})
							),
					  ]
					: [
							...acceptedFiles.map((file: File) =>
								Object.assign(file, {
									preview: URL.createObjectURL(file),
								})
							),
					  ];
				if (acceptedFile.length > maxFiles) {
					validationHandler && validationHandler(name, `Maximum ${maxFiles} files allowed.`);
				} else {
					setFiles(acceptedFile);
					validationHandler && validationHandler(name, '');
					acceptedFiles.forEach((file: File) => {
						const reader = new FileReader();
						reader.onabort = () => alert('File reading was aborted');
						reader.onerror = () => alert('file reading has failed');
						reader.readAsDataURL(file);
						reader.onloadend = () => {};
					});
					console.log('name', name, acceptedFile, onChange);
					onChange({ name, acceptedFile });
				}
			}
		},
		[accept, maxSize, maxFiles, files, name, onChange, validationHandler]
	);

	React.useEffect(
		() => () => {
			files.forEach(file => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	const handleRemove = React.useCallback(
		(file: File) => {
			const updatedFiles = files.filter(f => f !== file);
			setFiles(updatedFiles);
			onChange(name, updatedFiles);
		},
		[files, name, onChange]
	);

	return (
		<div className='file-upload'>
			{label && <Label id={name} className={labelClassName} label={label} />}
			{renderUpload(onDrop, files, handleRemove)}
			{renderPreview && <div className='file-preview'>{renderPreview(files, handleRemove)}</div>}
			{helperText && typeof helperText === 'string' ? (
				<p className={classNames('italic text-gray-600 text-xs', helperTextClassName)}>{helperText}</p>
			) : (
				helperText
			)}
		</div>
	);
};
