import React from 'react';
import Todolist from '../Todolist/Todolist';
import s from './App.module.css';
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

const App = () => {
  const tasks: Array<TaskType> = [
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: false},
    {id: v1(), title: 'React', isDone: false},
  ]

  return (
    <div className={s.App}>
      <Todolist tasks={tasks}/>
    </div>
  );
};

export default App;
