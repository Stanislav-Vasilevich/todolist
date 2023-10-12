import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
	title: string
	editTitle: (value: string) => void
}

const EditableTitle = (props: PropsType) => {
	const [value, setValue] = useState(props.title);
	const [editMode, setEditMode] = useState(true);

	const activateEditMode = () => {
		setEditMode(false);
	}

	const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	}

	const editTitle = () => {
		setEditMode(true);
		props.editTitle(value);
	}

	const activateViewMode = () => {
		editTitle();
	}

	const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			editTitle();
		}
	}

	return (
		editMode
			? <span onDoubleClick={activateEditMode}>{props.title}</span>
			: <input
				onChange={changeValue}
				onKeyDown={onKeyPress}
				onBlur={activateViewMode}
				type="text"
				value={value}
				autoFocus
			/>
	)
};

export default EditableTitle;
