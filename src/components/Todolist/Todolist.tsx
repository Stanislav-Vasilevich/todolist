import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterTasksType, TaskType} from '../App/App';
import s from './Todolist.module.css';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableTitle from '../EditableTitle/EditableTitle';

type PropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  filter: FilterTasksType
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  removeTask: (todolist: string, taskId: string) => void
  changeFilter: (todolistId: string, value: FilterTasksType) => void
  editTitleTodolist: (todolistId: string, title: string) => void
  editTitleTask: (todolistId: string, taskId: string, value: string) => void
}

const Todolist = (props: PropsType) => {
  const filteredTasksAll = () => {
    props.changeFilter(props.todolistId, 'all');
  }

  const filteredTasksActive = () => {
    props.changeFilter(props.todolistId, 'active');
  }

  const filteredTasksCompleted = () => {
    props.changeFilter(props.todolistId, 'completed');
  }

  const activeClassButtonFilterAll = props.filter === 'all' ? s.buttonActive : s.button;
  const activeClassButtonFilterActive = props.filter === 'active' ? s.buttonActive : s.button;
  const activeClassButtonFilterCompleted = props.filter === 'completed' ? s.buttonActive : s.button;

  const addTask = (title: string) => {
    props.addTask(props.todolistId, title);
  }

  const editTitleTodolist = (value: string) => {
    props.editTitleTodolist(props.todolistId, value);
  }

  return (
    <div>
      <h2>
        <EditableTitle title={props.title} editTitle={editTitleTodolist}/>
      </h2>
      <AddItemForm addItem={addTask}/>
      <ul>
        {props.tasks.map(t => {
          const removeTaskHandler = () => {
            props.removeTask(props.todolistId, t.id);
          }

          const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
          }

          const editTitleTask = (value: string) => {
            props.editTitleTask(props.todolistId, t.id, value);
          }

          return (
            <li className={t.isDone ? s.checkboxActive : ''} key={t.id}>
              <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
              <EditableTitle title={t.title} editTitle={editTitleTask}/>
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
