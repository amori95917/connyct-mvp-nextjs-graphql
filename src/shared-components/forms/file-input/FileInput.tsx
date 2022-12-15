import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import { AiOutlineCloudUpload, AiFillDelete } from 'react-icons/ai';

import { Label } from '@/ui-elements/atoms/forms';

type FileUploadProps = {
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
	onChange: (fieldName: string, fieldValues: any) => void;
	validationHandler?: (fieldName: string, message: string) => void;
	value: any;
	uploadComponent: React.ReactNode;
	// renderUpload: (
	// 	onDrop: (acceptedFiles: any, rejectedFiles: any) => void,
	// 	register: any
	// ) => React.ReactNode;
	// renderPreview: (file: any, onRemove: () => void) => React.ReactNode;
};
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
		value,
		uploadComponent,
	} = props;
	const [files, setFiles] = useState([]);

	const onDrop = useCallback(
		(acceptedFiles, rejectedFiles) => {
			if (rejectedFiles && rejectedFiles.length > 0) {
				setFiles(files);
				onChange(name, files);
				rejectedFiles.forEach(file => {
					file.errors.forEach(err => {
						if (err.code === 'file-invalid-type') {
							validationHandler && validationHandler(name, `Invalid file format. Only allow ${accept}`);
						} else if (err.code === 'file-too-large') {
							// eslint-disable-next-line no-restricted-properties
							const sizeMb = Math.ceil(maxSize / Math.pow(1024, 2));
							validationHandler && validationHandler(name, `File is larger than ${sizeMb} Mb`);
						} else validationHandler && validationHandler(name, err.message);
					});
				});
			} else {
				const acceptedFile = files
					? [
							...files,
							...acceptedFiles.map(file =>
								Object.assign(file, {
									preview: URL.createObjectURL(file),
								})
							),
					  ]
					: [
							...acceptedFiles.map(file =>
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
					acceptedFiles.forEach(file => {
						const reader = new FileReader();
						reader.onabort = () => alert('File reading was aborted');
						reader.onerror = () => alert('file reading has failed');
						reader.readAsDataURL(file);
						reader.onloadend = () => {};
					});
					onChange(name, acceptedFile);
				}
			}
		},
		[accept, maxSize, maxFiles, files, name, onChange, validationHandler]
	);

	// clean up
	useEffect(
		() => () => {
			files.forEach(file => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	const getFileName = file => {
		if (file) {
			if (file && file?.name) return file.name;
			const extractFileName = file.substr(file.lastIndexOf('/') + 1);
			return extractFileName;
		}
		// return Math.floor(Math.random() * 1000001);
	};

	const handleRemove = React.useCallback(
		file => {
			const updatedFiles = files.filter(f => f !== file);
			setFiles(updatedFiles);
			onChange(name, updatedFiles);
		},
		[files, name, onChange]
	);

	useEffect(() => {
		let newFiles = [];
		if (value && Array.isArray(value) && value.length > 0) {
			if (value.every(file => !file.preview)) {
				value.forEach(file => {
					if (!file.preview)
						newFiles = [
							...newFiles,
							{
								preview: URL.createObjectURL(file),
								name: getFileName(file),
							},
						];
				});
				setFiles(newFiles);
			}
		} else {
			if (value) {
				newFiles = [
					...newFiles,
					{
						preview: value,
						name: getFileName(value),
					},
				];
				setFiles(newFiles);
			}
		}
	}, [name, value]);

	const thumbs = files.map(file => {
		console.log('file', file);
		if (
			!(file?.name.match(/\.(jpg|jpeg|png|gif)$/) || file?.preview.match(/\.(jpg|jpeg|png|gif)$/))
		) {
			return (
				// eslint-disable-next-line react/jsx-indent
				<div key={file.name} className='position-relative thumb--document'>
					<AiOutlineCloudUpload
						className='cursor-pointer text-secondary'
						size={100}
						onClick={() => window.open(file.preview)}
					/>
					<AiFillDelete onClick={e => deleteFile(e, file)} />
					<span className='mt-2 thumb--document-name'>{`${file.name}`}</span>
				</div>
			);
		} else {
			return (
				<div key={file.name}>
					<div className='position-relative thumb' key={file.name + file.preview}>
						<Image src={file.preview || file} alt={file.name} width='200' height='200' />
						<AiFillDelete onClick={e => deleteFile(e, file)} />
					</div>
				</div>
			);
		}
	});
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		maxFiles: multiple ? maxFiles : 0,
		accept,
		onDrop,
		minSize: 0,
		maxSize,
		multiple,
	});

	return (
		<div className='file-input'>
			{label && <Label id={name} className={labelClassName} label={label} />}
			{helperText && typeof helperText === 'string' ? (
				<p className={classNames('italic text-gray-600 text-xs', helperTextClassName)}>{helperText}</p>
			) : (
				helperText
			)}
			<div
				{...getRootProps({
					className: 'dropzone w-100 fs-20 d-flex align-items-center',
				})}>
				<input type='file' id={name} name={name} {...getInputProps()} />
				{uploadComponent || (
					<AiOutlineCloudUpload className='cursor-pointer mr-1 text-secondary' size={100} />
				)}
				{/* {isDragActive ? (
					<span className='fs-16'>Drop the files here ... </span>
				) : (
					<span className='fs-16'>Select files </span>
				)} */}
			</div>
			{files && <aside className='thumbs-container'>{thumbs}</aside>}
			{error ? <span className='fs-12 text-danger'>{error}</span> : null}
		</div>
	);
};

export default FileUpload;

export const FileInput = ({ name, multiple, defaultValue, control, uploadComponent, ...rest }) => {
	// const { control } = useFormContext(); // can't use this as I get cannot read properties of null
	return (
		<>
			<Controller
				render={({ onChange, value }) => (
					<FileUpload
						name={name}
						multiple={multiple}
						uploadComponent={uploadComponent}
						onChange={(name, files) => {
							if (files) {
								onChange && onChange(name, files);
							}
							// return onChange(multiple ? e.target.files : e.target.files[0]);
						}}
						value={value}
						{...rest}
					/>
				)}
				name={name}
				control={control}
				defaultValue={defaultValue}
			/>
		</>
	);
};
