import React, {ChangeEvent, useState} from 'react';
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
}

const Todolist = (props: PropsType) => {
  const [titleTask, setTitleTask] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(e.currentTarget.value);
  }

  const addTaskHandler = () => {
    props.addTask(titleTask);
    setTitleTask('');
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={titleTask} onChange={onChangeHandler}/>
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>
        {
          props.tasks.map((i) => {
            const removeTaskHandler = () => {
              props.removeTask(i.id);
            }

            return (
              <li key={i.id}>
                <input type="checkbox" checked={i.checkbox}/>
                <span>{i.title}</span>
                <button onClick={removeTaskHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button onClick={() => {props.changeFilter('all')}}>All</button>
        <button onClick={() => {props.changeFilter('active')}}>Active</button>
        <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
      </div>
    </div>
  )
}

export default Todolist;
