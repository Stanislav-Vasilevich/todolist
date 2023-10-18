import {
	addTodolistAC,
	AddTodolistType, changeTodolistAC, changeTodolistFilterAC,
	ChangeTodolistFilterType, ChangeTodolistTitleType,removeTodolistAC,
	RemoveTodolistType,
	todolistReducer
} from './todolist-reducer'
import { v1 } from 'uuid'
import {FilterTasksType, TodolistType} from "../components/App/App";

test('correct todolist should be removed', () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	const startState: Array<TodolistType> = [
		{id: todolistId1, title: 'What to learn', filter: 'all'},
		{id: todolistId2, title: 'What to buy', filter: 'all'}
	];

	const action: RemoveTodolistType = removeTodolistAC(todolistId1);

	const endState = todolistReducer(startState, action);

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	let newTodolistTitle = 'New Todolist';

	const startState: Array<TodolistType> = [
		{id: todolistId1, title: 'What to learn', filter: 'all'},
		{id: todolistId2, title: 'What to buy', filter: 'all'}
	];

	const action: AddTodolistType = addTodolistAC(newTodolistTitle);

	const endState = todolistReducer(startState, action);

	expect(endState.length).toBe(3);
	expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	let newTodolistTitle = 'New Todolist';

	const startState: Array<TodolistType> = [
		{id: todolistId1, title: 'What to learn', filter: 'all'},
		{id: todolistId2, title: 'What to buy', filter: 'all'}
	]

	const action: ChangeTodolistTitleType = changeTodolistAC(todolistId2, newTodolistTitle);

	const endState = todolistReducer(startState, action);

	expect(endState[0].title).toBe('What to learn');
	expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	let newFilter: FilterTasksType = 'completed';

	const startState: Array<TodolistType> = [
		{id: todolistId1, title: 'What to learn', filter: 'all'},
		{id: todolistId2, title: 'What to buy', filter: 'all'}
	];

	const action: ChangeTodolistFilterType = changeTodolistFilterAC(todolistId2, newFilter);

	const endState = todolistReducer(startState, action);

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
});
