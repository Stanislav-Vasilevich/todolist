import React from 'react';
import {FilterValuesType} from '../../App';
import s from './Todolist.module.css';

type TaskType = {
  id: number
  title: string
  checkbox: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: number) => void
  changeFilter: (value: FilterValuesType) => void
  filter: FilterValuesType
}

const Todolist = (props: PropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {
          props.tasks.map((i) => {
            return (
              <li key={i.id}>
                <input type="checkbox" checked={i.checkbox}/>
                <span>{i.title}</span>
                <button onClick={() => {props.removeTask(i.id)}}>x</button>
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
