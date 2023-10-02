import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterTasksType, TaskType} from '../App/App';
import s from './Todolist.module.css';

type PropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterTasksType
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterTasksType) => void
}

const Todolist = (props: PropsType) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);

    if(value.trim().length > 0) {
      setError(null);
    }
  }

  const addTaskHandler = () => {
    const valueTrim = value.trim();

    if(!valueTrim) return;
    if(valueTrim.length < 2) {
      setError('Минимум 2 символа');
      return;
    }

    setValue('');
    props.addTask(valueTrim);
    setError(null);
  }

  const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      addTaskHandler();
    }
  }

  const filteredTasksAll = () => {
    props.changeFilter('all');
  }

  const filteredTasksActive = () => {
    props.changeFilter('active');
  }

  const filteredTasksCompleted = () => {
    props.changeFilter('completed');
  }

  const activeClassButtonFilterAll = props.filter === 'all' ? s.buttonActive : s.button;
  const activeClassButtonFilterActive = props.filter === 'active' ? s.buttonActive : s.button;
  const activeClassButtonFilterCompleted = props.filter === 'completed' ? s.buttonActive : s.button;

  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input
          className={error ? s.inputError : ''}
          type="text" onChange={changeValue}
          value={value}
          onKeyPress={addTaskOnKeyPressHandler}
        />
        <button onClick={addTaskHandler}>+</button>
        {error ? <div className={s.inputErrorText}>{error}</div> : ''}
      </div>
      <ul>
        {props.tasks.map(t => {
          const removeTaskHandler = () => {
            props.removeTask(t.id);
          }

          const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked);
          }

          return (
            <li className={t.isDone ? s.checkboxActive : ''} key={t.id}>
              <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
              {t.title}
              <button onClick={removeTaskHandler}>x</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button className={activeClassButtonFilterAll} onClick={filteredTasksAll}>All</button>
        <button className={activeClassButtonFilterActive} onClick={filteredTasksActive}>Active</button>
        <button className={activeClassButtonFilterCompleted} onClick={filteredTasksCompleted}>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
