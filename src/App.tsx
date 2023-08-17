import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = 'active' | 'completed' | 'all';

function App() {
  const [tasks, setTasks] = useState([
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: false},
    {id: v1(), title: 'React', isDone: false},
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeTask = (idTask: string) => {
    setTasks(tasks.filter(i => i.id !== idTask));
  }

  const filterTasks = (tasks: TaskType[], filter: FilterValuesType) => {
    let newTasksFilter = tasks;

    if(filter === 'active') {
      newTasksFilter = tasks.filter(i => !i.isDone);
    }
    if(filter === 'completed') {
      newTasksFilter = tasks.filter(i => i.isDone);
    }

    return newTasksFilter;
  }

  const setFilteredTasks = (status: FilterValuesType) => {
    setFilter(status);
  }

  return (
    <div className="App">
      <Todolist
        title={'What to learn?'}
        tasks={filterTasks(tasks, filter)}
        filter={filter}
        setFilter={setFilteredTasks}
        removeTask={removeTask}
      />
    </div>
  );
}

export default App;
