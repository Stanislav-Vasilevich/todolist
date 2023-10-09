import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../Todolist/Todolist.module.css';

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
      <input
        className={error ? s.inputError : ''}
        type="text" onChange={changeValue}
        value={value}
        onKeyPress={onKeyPressHandler}
      />
      <button onClick={addItemHandler}>+</button>
      {error ? <div className={s.inputErrorText}>{error}</div> : ''}
    </div>
  );
};

export default AddItemForm;
