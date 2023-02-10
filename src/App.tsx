import React, {useState} from 'react';
import './App.css';
import Todolist from './components/Todolist/Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TaskType = {
	id: string
	title: string
	checkbox: boolean
}
type TasksType = {
	[todoListId: string]: Array<TaskType>
}

const todoListId_1 = v1();
const todoListId_2 = v1();

function App() {
	const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
		{id: todoListId_1, title: 'What to learn?', filter: 'all'},
		{id: todoListId_2, title: 'What to bye?', filter: 'all'},
	]);
	const [tasks, setTasks] = useState<TasksType>({
		[todoListId_1]: [
			{id: v1(), title: 'HTML', checkbox: true},
			{id: v1(), title: 'CSS', checkbox: true},
			{id: v1(), title: 'JS', checkbox: true},
			{id: v1(), title: 'JS', checkbox: true},
			{id: v1(), title: 'React', checkbox: false}
		],
		[todoListId_2]: [
			{id: v1(), title: 'milk', checkbox: true},
			{id: v1(), title: 'meet', checkbox: true},
			{id: v1(), title: 'orange', checkbox: false},
		],
	});

	const changeFilter = (value: FilterValuesType, todolistId: string) => {
		todoLists.find(t => {
			if(t.id === todolistId) {
				t.filter = value;

				setTodoLists([...todoLists]);
			}
		})
	}

	const removeTask = (todoListId: string, taskId: string) => {
		const removeTask = tasks[todoListId].filter(t => t.id !== taskId);
		tasks[todoListId] = removeTask;
		setTasks({...tasks});
	}

	const addTask = (todoListId: string, title: string) => {
		const newTask = {id: v1(), title, checkbox: false};
		const tasksTodolist = tasks[todoListId];

		tasks[todoListId] = [newTask, ...tasksTodolist];
		setTasks({...tasks});
	}

	const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
		const task = tasks[todoListId].find(i => i.id === taskId);

		if (task) {
			task.checkbox = isDone;
		}
		setTasks({...tasks});
	}

	const removeTodoList = (todoListId: string) => {
		const arrTodoList = todoLists.filter(t => t.id !== todoListId);

		setTodoLists(arrTodoList);

		delete tasks[todoListId];
	}

	const changeTitle = (title: string, todoListId: string, taskId: string) => {
		const taskTitle = tasks[todoListId].find(t => t.id === taskId);

		if(taskTitle) {
			taskTitle.title = title;
			setTasks({...tasks});
		}
	}

	const changeTitleTodoList = (newTitle: string, todoListId: string) => {
		const todolist = todoLists.find(t => t.id === todoListId);
		if(todolist) {
			todolist.title = newTitle;

			setTodoLists([...todoLists]);
		}
	}

	return (
		<div className="App">
			{
				todoLists.map(t => {
					let tasksTodolist = tasks[t.id];

					if (t.filter === 'completed') {
						tasksTodolist = tasksTodolist.filter(i => i.checkbox);
					}
					if (t.filter === 'active') {
						tasksTodolist = tasksTodolist.filter(i => !i.checkbox);
					}

					return (
						<Todolist
							key={t.id}
							todoListId={t.id}
							title={t.title}
							tasks={tasksTodolist}
							removeTask={removeTask}
							changeFilter={changeFilter}
							filter={t.filter}
							addTask={addTask}
							changeTaskStatus={changeTaskStatus}
							removeTodoList={removeTodoList}
							changeTitle={changeTitle}
							changeTitleTodoList={changeTitleTodoList}
						/>
					)
				})
			}
		</div>
	);
}

export default App;
