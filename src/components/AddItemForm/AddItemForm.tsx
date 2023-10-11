import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../Todolist/Todolist.module.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {Button, FormControl, FormHelperText, Icon, IconButton, Input, InputLabel, TextField} from '@mui/material';

type PropsType = {
  addItem: (value: string) => void
}

const AddItemForm = (props: PropsType) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);

    if(value.trim().length >= 0) {
      setError(null);
    }
  }

  const addItemHandler = () => {
    const valueTrim = value.trim();

    if(valueTrim.length < 2 || valueTrim === '') {
      setError('Минимум 2 символа');
      return;
    }
    if(!valueTrim) return;

    setValue('');
    props.addItem(valueTrim);
    setError(null);
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      addItemHandler();
    }
  }

  return (
    <div>
      <TextField
        className={error ? s.inputError : ''}
        onChange={changeValue}
        onKeyPress={onKeyPressHandler}
        value={value}
        label={error ? error : ''}
        type="text"
        variant="standard"
      />
      <IconButton onClick={addItemHandler}>
        <Icon color="primary">+</Icon>
      </IconButton>
    </div>
  );
};

export default AddItemForm;
