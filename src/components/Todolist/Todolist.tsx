import React, {ChangeEvent} from 'react';
import {FilterTasksType, TaskType} from '../App/App';
import s from './Todolist.module.css';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableTitle from '../EditableTitle/EditableTitle';
import {Button, Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <ul className={s.list}>
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
              <Checkbox checked={t.isDone} onChange={onChangeTaskStatusHandler} size="small" />
              <EditableTitle title={t.title} editTitle={editTitleTask}/>
              <IconButton onClick={removeTaskHandler} aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </li>
          )
        })}
      </ul>
      <div>
        <Button
					onClick={filteredTasksAll}
					size={'small'}
					variant={props.filter === 'all' ? 'contained' : 'outlined'}
				>
					All
				</Button>
        <Button
					onClick={filteredTasksActive}
					size={'small'}
					variant={props.filter === 'active' ? 'contained' : 'outlined'}
				>
					Active
				</Button>
        <Button
					variant={props.filter === 'completed' ? 'contained' : 'outlined'}
					onClick={filteredTasksCompleted}
					size={'small'}
				>
					Completed
				</Button>
      </div>
    </div>
  );
};

export default Todolist;
