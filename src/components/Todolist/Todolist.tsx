import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../../App';
import s from './Todolist.module.css';

type TaskType = {
  id: string
  title: string
  checkbox: boolean
}
type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  filter: FilterValuesType
  addTask: (title: string) => void
  changeTaskStatus: (id: string, isDone: boolean) => void
}

const Todolist = (props: PropsType) => {
  const [titleTask, setTitleTask] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('Мин. кол-во символов 2');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(e.currentTarget.value);
    setError(false);
    setErrorText('');
  }

  const addTaskHandler = () => {
    if(titleTask.trim() === '' || titleTask.trim().length < 2) {
      setError(true);
      setErrorText('Мин. кол-во символов 2');
      return;
    } else {
      setError(false);
      props.addTask(titleTask.trim());
      setErrorText('');
    }

    setTitleTask('');
  }

  const addTaskKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      addTaskHandler();
    }
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          className={error ? `${s.input} ${s.error}` : s.input}
          value={titleTask}
          onChange={onChangeHandler}
          onKeyPress={addTaskKeyPressHandler}
        />
        <button onClick={addTaskHandler}>+</button>
        <div className={s.errorText}>{error ? errorText : ''}</div>
      </div>
      <ul>
        {
          props.tasks.map((i) => {
            const removeTaskHandler = () => {
              props.removeTask(i.id);
            }

            const changeTaskActiveHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(i.id, e.currentTarget.checked);
            }

            return (
              <li className={i.checkbox ? s.isDone : ''} key={i.id}>
                <input type="checkbox" checked={i.checkbox} onChange={changeTaskActiveHandler}/>
                <span>{i.title}</span>
                <button onClick={removeTaskHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? `${s.button} ${s.buttonActive}` : s.button} onClick={() => {
          props.changeFilter('all')
        }}>All
        </button>
        <button className={props.filter === 'active' ? `${s.button} ${s.buttonActive}` : s.button} onClick={() => {
          props.changeFilter('active')
        }}>Active
        </button>
        <button className={props.filter === 'completed' ? `${s.button} ${s.buttonActive}` : s.button} onClick={() => {
          props.changeFilter('completed')
        }}>Completed
        </button>
      </div>
    </div>
  )
}

export default Todolist;
