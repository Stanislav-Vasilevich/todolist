import './../../index.css';
import Todolist from '../Todolist/Todolist';

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

type TodolistType = {
	title: string
}

const App = () => {
	const todolist: TodolistType = {
		title: 'What to learn',
	}

	const tasks: Array<TaskType> = [
		{id: 1, title: 'HTML&CSS', isDone: true},
		{id: 2, title: 'JS', isDone: true},
		{id: 3, title: 'React', isDone: false}
	];

	return (
		<div>
			<Todolist title={todolist.title} tasks={tasks}/>
		</div>
	);
};

export default App;
