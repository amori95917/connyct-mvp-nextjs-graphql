import React from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';

// import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
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
	onEditorStateChange: (editorState: EditorState) => void;
};

const ContentEditor = (props: EditorProps) => {
	const {
		value,
		onEditorStateChange,
		wrapperClassName = '',
		editorWrapperClassName = '',
		editorClassName = '',
		labelClassName = '',
		placeholder,
		helperText,
		label,
		id,
	} = props;
	// const [editorState, setEditorState] = useState(EditorState.createEmpty());
	// const handleEditorStateChange = (editorState: EditorState) => {
	// 	setEditorState(editorState);
	// };
	return (
		<>
			<div className={wrapperClassName}>
				{label && <Label id={id} className={labelClassName} label={label} />}
				<Editor
					editorState={value}
					wrapperClassName={editorWrapperClassName}
					editorClassName={editorClassName}
					onEditorStateChange={onEditorStateChange}
					placeholder={placeholder}
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
