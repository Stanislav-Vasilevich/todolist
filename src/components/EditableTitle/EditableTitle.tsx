import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
  title: string
  editTitle: (value: string) => void
}

const EditableTitle = (props: PropsType) => {
  const [value, setValue] = useState('');
  const [editMode, setEditMode] = useState(true);

  const activateEditMode = () => {
    setEditMode(false);
  }

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }

  const editTitle = () => {
    props.editTitle(value);
    setEditMode(true);
  }

  const activateViewMode = () => {
    editTitle();
  }

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      editTitle();
    }
  }

  return (
    editMode
      ? <span onDoubleClick={activateEditMode}>{props.title}</span>
      : <input onChange={changeValue} onKeyPress={onKeyPress} onBlur={activateViewMode} type="text" value={props.title} autoFocus/>
  )
};

export default EditableTitle;
