import {useState} from 'react';
import {TasksType} from '../components/App/App';
import {v1} from 'uuid';

type ActionType = {
  type: 'ADD-TASK',
  todolistId: string
  title: string
}

export const tasksReducer = (state: TasksType, action: ActionType) => {
  switch (action.type) {
    case 'ADD-TASK':
      const task = {id: v1(), title: action.title, isDone: false};
      const newState = {...state, state[action.todolistId]: [...state[action.todolistId], task]};

      return newState;
    default:
      return state;
  }
}

const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    todolistId,
    title
  }
}
