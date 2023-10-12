import React, {useState} from 'react';
import Todolist from '../Todolist/Todolist';
import s from './App.module.css';
import {v1} from 'uuid';
import AddItemForm from '../AddItemForm/AddItemForm';
import {AppBar, Box, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
type TasksType = {
	[key: string]: Array<TaskType>
}
type TodolistType = {
	id: string
	title: string
	filter: FilterTasksType
}
export type FilterTasksType = 'all' | 'active' | 'completed';

const todolistId1 = v1();
const todolistId2 = v1();
const todolistId3 = v1();

const App = () => {
	const [todolist, setTodolist] = useState<Array<TodolistType>>([
		{id: todolistId1, title: 'What to learn?', filter: 'all'},
		{id: todolistId2, title: 'What to buy?', filter: 'all'},
		{id: todolistId3, title: 'What to read?', filter: 'all'},
	]);
	const [tasks, setTasks] = useState<TasksType>({
		[todolistId1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: false},
			{id: v1(), title: 'React', isDone: false},
		],
		[todolistId2]: [
			{id: v1(), title: 'Milk', isDone: true},
			{id: v1(), title: 'Meet', isDone: false},
			{id: v1(), title: 'Water', isDone: false},
		],
		[todolistId3]: [
			{id: v1(), title: 'Book', isDone: true},
			{id: v1(), title: 'Newspaper', isDone: false},
			{id: v1(), title: 'Posts', isDone: false},
		],
	});

	const addTask = (todolistId: string, title: string) => {
		const task = {id: v1(), title, isDone: false};

		setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]});
	}

	const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)});
	}

	const removeTask = (todolistId: string, taskId: string) => {
		const newTasks = tasks[todolistId].filter(t => t.id !== taskId);
		setTasks({...tasks, [todolistId]: newTasks});
	}

	const changeFilter = (todolistId: string, value: FilterTasksType) => {
		setTodolist(todolist.map(t => t.id === todolistId ? {...t, filter: value} : t));
	}

	const addTodolist = (title: string) => {
		const todolistId = v1();
		const newTodolist: TodolistType = {id: todolistId, title, filter: 'all'};

		setTodolist([...todolist, newTodolist]);
		setTasks({...tasks, [todolistId]: []});
	}

	const editTitleTodolist = (todolistId: string, title: string) => {
		const newTodolist = todolist.map(t => t.id === todolistId ? {...t, title} : t);

		setTodolist(newTodolist);
	}

	const editTitleTask = (todolistId: string, taskId: string, title: string) => {
		tasks[todolistId] = tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t);

		setTasks({...tasks});
	}

	return (
		<div>
			<AppBar position="static">
				<Toolbar variant="dense">
					<IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
						<MenuIcon/>
					</IconButton>
					<Typography variant="h6" color="inherit" component="div">
						Photos
					</Typography>
				</Toolbar>
			</AppBar>

			<Container maxWidth="xl">
				<Grid
					container
					style={{padding: '20px'}}
				>
					<AddItemForm addItem={addTodolist}/>
				</Grid>
				<Grid
					container
					spacing={3}
					justifyContent="center"
					alignItems="center"
				>
					{
						todolist.map(t => {
							const filteredTask = () => {
								let taskForTodolist = tasks[t.id];

								if (t.filter === 'active') {
									taskForTodolist = tasks[t.id].filter(t => !t.isDone);
								}

								if (t.filter === 'completed') {
									taskForTodolist = tasks[t.id].filter(t => t.isDone);
								}

								return taskForTodolist;
							}

							return (
								<Grid item>
									<Paper style={{padding: '40px'}}>
										<Todolist
											key={t.id}
											todolistId={t.id}
											title={t.title}
											tasks={filteredTask()}
											filter={t.filter}
											addTask={addTask}
											changeTaskStatus={changeTaskStatus}
											removeTask={removeTask}
											changeFilter={changeFilter}
											editTitleTodolist={editTitleTodolist}
											editTitleTask={editTitleTask}
										/>
									</Paper>
								</Grid>
							)
						})
					}
				</Grid>
			</Container>
		</div>
	);
};

export default App;
