import {TasksType} from '../components/App/App';
import {v1} from 'uuid';

type AddTaskActionType = {
  type: 'ADD-TASK',
  todolistId: string
  title: string
}

type ActionsTypes = AddTaskActionType;

export const tasksReducer = (state: TasksType, action: ActionsTypes):TasksType => {
  switch (action.type) {
		case 'ADD-TASK':
      const task = {id: v1(), title: action.title, isDone: false};
      const newState = {...state, [action.todolistId]:[...state[action.todolistId], task]};

      return newState;
    default:
      return state;
  }
}

export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    todolistId,
    title
  }
}
