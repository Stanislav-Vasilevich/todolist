import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
	title: string
	changeTitle: (newTitle: string) => void
}

const ChangeInput = (props: PropsType) => {
	const [title, setTitle] = useState(props.title);
	const [editMode, setEditMode] = useState(false);

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.currentTarget.value;
		setTitle(newTitle);
		props.changeTitle(newTitle);
	}

	const activateViewModeEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if(e.key === 'Enter') {
			setEditMode(false);
		}
	}

	const activateEditMode = () => setEditMode(false);
	const activateViewMode = () => setEditMode(true);

	return editMode
		? <input type="text" onChange={onChangeTitleHandler} onKeyPress={activateViewModeEnter} onBlur={activateEditMode} value={title} autoFocus/>
		: <span onDoubleClick={activateViewMode}>{props.title}</span>
};

export default ChangeInput;
