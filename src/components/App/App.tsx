import React, {useState} from 'react';
import Todolist from '../Todolist/Todolist';
import s from './App.module.css';
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterTasksType = 'all' | 'active' | 'completed';

const App = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: false},
    {id: v1(), title: 'React', isDone: false},
  ]);
  const [filter, setFilter] = useState<FilterTasksType>('all');

  const addTask = (title: string) => {
    const newTask = {id: v1(), title, isDone: false};

    setTasks([newTask, ...tasks]);
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newTasks = tasks.map(t => t.id === taskId ? {...t, isDone} : t);

    setTasks(newTasks);
  }

  const removeTask = (taskId: string) => {
    const newTasks = tasks.filter(t => t.id !== taskId);

    setTasks(newTasks);
  }

  const filteredTask = () => {
    let taskForTodolist = tasks;

    if(filter === 'active') {
      taskForTodolist = tasks.filter(t => !t.isDone);
    }

    if(filter === 'completed') {
      taskForTodolist = tasks.filter(t => t.isDone);
    }

    return taskForTodolist;
  }

  const changeFilter = (value: FilterTasksType) => {
    setFilter(value);
  }

  return (
    <div className={s.App}>
      <Todolist
        title={'What to learn?'}
        tasks={filteredTask()}
        filter={filter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
};

export default App;
