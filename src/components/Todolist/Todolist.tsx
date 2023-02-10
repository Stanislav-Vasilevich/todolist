import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../../App';
import s from './Todolist.module.css';

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (todoListId: string, taskId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	filter: FilterValuesType
	addTask: (todoListId: string, title: string) => void
	changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void
	removeTodoList: (todoListId: string) => void
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
			props.addTask(props.id, titleTask.trim());
			setErrorText('');
		}

		setTitleTask('');
	}

	const addTaskKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addTaskHandler();
		}
	}

	return (
		<div>
			<h3>
				{props.title}
				<button
					className={s.removeButton}
					onClick={() => props.removeTodoList(props.id)}
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
						return (
							<li className={i.checkbox ? `${s.isDone} ${s.item}` : s.item} key={i.id}>
								<input
									type="checkbox"
									checked={i.checkbox}
									onChange={(e) => props.changeTaskStatus(props.id, i.id, e.currentTarget.checked)}/>
								<span>{i.title}</span>
								<button
									className={s.removeButton}
									onClick={() => props.removeTask(props.id, i.id)}
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
					props.changeFilter('all', props.id)
				}}>All
				</button>
				<button className={props.filter === 'active' ? `${s.button} ${s.buttonActive}` : s.button} onClick={() => {
					props.changeFilter('active', props.id)
				}}>Active
				</button>
				<button className={props.filter === 'completed' ? `${s.button} ${s.buttonActive}` : s.button} onClick={() => {
					props.changeFilter('completed', props.id)
				}}>Completed
				</button>
			</div>
		</div>
	)
}

export default Todolist;
