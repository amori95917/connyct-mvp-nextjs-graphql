import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

// import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { Label } from '@/ui-elements/atoms/forms';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type EditorProps = {
	id: string;
	wrapperClassName?: string;
	editorWrapperClassName?: string;
	editorClassName?: string;
	labelClassName?: string;
	placeholder?: string;
	value: EditorState;
	label?: string | React.ReactNode;
	helperText?: string | React.ReactNode;
	onChange: (stringifyEditor: string) => void;
};

// let htmlToDraft = null;
// if (typeof window === 'object') {
// 	htmlToDraft = require('html-to-draftjs').default;
// }

const ContentEditor = (props: EditorProps) => {
	const {
		value,
		onChange,
		wrapperClassName = '',
		editorWrapperClassName = '',
		editorClassName = '',
		labelClassName = '',
		placeholder,
		helperText,
		label,
		id,
	} = props;
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [updated, setUpdated] = useState(false);
	useEffect(() => {
		if (!updated) {
			const htmlToDraft = require('html-to-draftjs').default;
			const defaultValue = value ? value : '';
			const blocksFromHtml = htmlToDraft(defaultValue);
			const contentState = ContentState.createFromBlockArray(
				blocksFromHtml.contentBlocks,
				blocksFromHtml.entityMap
			);
			const newEditorState = EditorState.createWithContent(contentState);
			setEditorState(newEditorState);
		}
	}, [updated, value]);
	// const { setValue } = useForm();
	const handleEditorStateChange = (editorState: EditorState) => {
		setUpdated(true);
		setEditorState(editorState);
		return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	};
	const wrapperClassNames = `border border-gray-300 border-solid ${editorWrapperClassName}`;
	const editorClassNames = `shadow-sm rounded py-4 px-4 ${editorClassName}`;
	return (
		<>
			<div className={wrapperClassName}>
				{label && <Label id={id} className={labelClassName} label={label} />}
				<Editor
					editorState={editorState}
					wrapperClassName={wrapperClassNames}
					editorClassName={editorClassNames}
					toolbarClassName='shadow-sm'
					onEditorStateChange={handleEditorStateChange}
					placeholder={placeholder}
					toolbar={toolbar}
					// className="border-gray-300"
				/>
			</div>
			{helperText && typeof helperText === 'string' ? (
				<p className='italic text-gray-600 text-xs'>{helperText}</p>
			) : (
				helperText
			)}
			{/* <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} /> */}
		</>
	);
};

export default ContentEditor;

ContentEditor.displayName = 'ContentEditor';

const toolbar = {
	options: ['inline', 'blockType', 'list'],
	inline: {
		inDropdown: false,
		className: undefined,
		component: undefined,
		dropdownClassName: undefined,
		options: ['bold', 'italic', 'underline', 'strikethrough'],
	},
	blockType: {
		inDropdown: true,
		options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
	},
	list: {
		inDrodown: false,
		options: ['unordered', 'ordered'],
	},
};
