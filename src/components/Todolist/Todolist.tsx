import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../../App';
import s from './Todolist.module.css';
import ChangeInput from "./ChangeInput/ChangeInput";

type PropsType = {
	todoListId: string
	title: string
	tasks: Array<TaskType>
	removeTask: (todoListId: string, taskId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	filter: FilterValuesType
	addTask: (todoListId: string, title: string) => void
	changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void
	removeTodoList: (todoListId: string) => void
	changeTitle: (newTitle: string, todoListId: string, taskId: string) => void
	changeTitleTodoList: (newTitle: string, todoListId: string) => void
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
		if (titleTask.trim() === '' || titleTask.trim().length < 2) {
			setError(true);
			setErrorText('Мин. кол-во символов 2');
			return;
		} else {
			setError(false);
			props.addTask(props.todoListId, titleTask.trim());
			setErrorText('');
		}

		setTitleTask('');
	}

	const addTaskKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addTaskHandler();
		}
	}

	const changeTitleTodoList = (newTitle: string) => {
		props.changeTitleTodoList(newTitle, props.todoListId);
	}

	return (
		<div>
			<h3>
				{/*{props.title}*/}
				<ChangeInput title={props.title} changeTitle={changeTitleTodoList}/>
				<button
					className={s.removeButton}
					onClick={() => props.removeTodoList(props.todoListId)}
				>&#215;</button>
			</h3>
			<div>
				<input
					className={error ? `${s.input} ${s.error}` : s.input}
					value={titleTask}
					onChange={onChangeHandler}
					onKeyPress={addTaskKeyPressHandler}
				/>
				<button className={s.button} onClick={addTaskHandler}>+</button>
				<div className={s.errorText}>{error ? errorText : ''}</div>
			</div>
			<ul className={s.list}>
				{
					props.tasks.map((i) => {
						const changeTitle = (title: string) => {
							props.changeTitle(title, props.todoListId, i.id);
						}

						return (
							<li className={i.checkbox ? `${s.isDone} ${s.item}` : s.item} key={i.id}>
								<input
									type="checkbox"
									checked={i.checkbox}
									onChange={(e) => props.changeTaskStatus(props.todoListId, i.id, e.currentTarget.checked)}/>
								<ChangeInput title={i.title} changeTitle={changeTitle}/>
								<button
									className={s.removeButton}
									onClick={() => props.removeTask(props.todoListId, i.id)}
								>
									&#215;
								</button>
							</li>
						)
					})
				}
			</ul>
			<div>
				<button className={props.filter === 'all' ? `${s.button} ${s.buttonActive}` : s.button} onClick={() => {
					props.changeFilter('all', props.todoListId)
				}}>All
				</button>
				<button className={props.filter === 'active' ? `${s.button} ${s.buttonActive}` : s.button} onClick={() => {
					props.changeFilter('active', props.todoListId)
				}}>Active
				</button>
				<button className={props.filter === 'completed' ? `${s.button} ${s.buttonActive}` : s.button} onClick={() => {
					props.changeFilter('completed', props.todoListId)
				}}>Completed
				</button>
			</div>
		</div>
	)
}

export default Todolist;
