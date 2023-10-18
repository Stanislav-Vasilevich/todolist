import {FilterTasksType, TodolistType} from "../components/App/App";
import {v1} from "uuid";

export type RemoveTodolistType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
export type AddTodolistType = {
	type: 'ADD-TODOLIST'
	title: string
}
export type ChangeTodolistTitleType = {
	type: 'CHANGE-TODOLIST-TITLE'
	id: string
	title: string
}
export type ChangeTodolistFilterType = {
	type: 'CHANGE-TODOLIST-FILTER'
	id: string
	filter: FilterTasksType
}
type ActionsType = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType;

export const todolistReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(t => t.id !== action.id);
		case 'ADD-TODOLIST':
			const todolist: TodolistType = {id: v1(), title: action.title, filter: 'all'};
			return [...state, todolist];
		case 'CHANGE-TODOLIST-TITLE':
			return state.map(t => t.id === action.id ? {...t, title: action.title} : t);
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t);
		default:
			return state;
	}
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistType => ({type: 'REMOVE-TODOLIST', id: todolistId})

export const addTodolistAC = (newTitle: string): AddTodolistType => ({type: 'ADD-TODOLIST', title: newTitle})

export const changeTodolistAC = (todolistId: string, newTitle: string): ChangeTodolistTitleType => ({
	type: 'CHANGE-TODOLIST-TITLE',
	id: todolistId,
	title: newTitle
});

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterTasksType): ChangeTodolistFilterType => ({
	type: 'CHANGE-TODOLIST-FILTER',
	id: todolistId,
	filter: newFilter
});
