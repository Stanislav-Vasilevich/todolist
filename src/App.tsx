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

const todoListId_1 = v1();
const todoListId_2 = v1();

function App() {
	const todoLists: Array<TodolistType> = [
		{id: todoListId_1, title: 'What to learn', filter: 'all'},
		{id: todoListId_2, title: 'What to bye', filter: 'completed'},
	]
	const [tasks, setTasks] = useState({
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
			{id: v1(), title: 'orange', checkbox: true},
		],
	});

	const changeFilter = (value: FilterValuesType, todolistId: string) => {
		console.log('id: ', todolistId)
		console.log('value: ', value);

		let filtered = tasks[todolistId];
		if(value === 'all') {
			filtered = tasks[todolistId].filter(i => i);
			console.log(filtered)
		}
		if(value === 'active') {
			filtered = tasks[todolistId].filter(i => !i.checkbox);
			console.log(filtered)
		}
		if(value === 'completed') {
			filtered = tasks[todolistId].filter(i => i.checkbox);
			console.log(filtered)
		}

		// setTasks([...filtered]);
	}

	const removeTask = (id: string) => {
		// const remove = tasks.filter(i => i.id !== id);
		// setTasks(remove);
	}

	const addTask = (title: string) => {
		const newTask = {id: v1(), title, checkbox: false};
		// setTasks([newTask, ...tasks]);
	}

	const changeTaskStatus = (id: string, isDone: boolean) => {
		// const task = tasks.find(i => i.id === id);

		// if (task) {
		// 	task.checkbox = isDone;
		// }
		// setTasks([...tasks]);
	}

	return (
		<div className="App">
			{
				todoLists.map(t => {
					let filtered = tasks[t.id];

					if (t.filter === 'completed') {
						filtered = tasks[t.id].filter(i => i.checkbox);
					}
					if (t.filter === 'active') {
						filtered = tasks[t.id].filter(i => !i.checkbox);
					}

					return (
						<Todolist
							key={t.id}
							id={t.id}
							title={t.title}
							tasks={filtered}
							removeTask={removeTask}
							changeFilter={changeFilter}
							filter={t.filter}
							addTask={addTask}
							changeTaskStatus={changeTaskStatus}
						/>
					)
				})
			}
		</div>
	);
}

export default App;
