import React, {useState} from 'react';
import './App.css';
import Todolist from './components/Todolist/Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState([
    {id: v1(), title: 'HTML', checkbox: true},
    {id: v1(), title: 'CSS', checkbox: true},
    {id: v1(), title: 'JS', checkbox: true},
    {id: v1(), title: 'JS', checkbox: true},
    {id: v1(), title: 'React', checkbox: false},
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeTask = (id: string) => {
    const remove = tasks.filter(i => i.id !== id);
    setTasks(remove);
  }

  let filtered = tasks;
  if(filter === 'completed') {
    filtered = tasks.filter(i => i.checkbox);
  }
  if(filter === 'active') {
    filtered = tasks.filter(i => !i.checkbox);
  }

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  }

  const addTask = (title: string) => {
    const newTask = {id: v1(), title, checkbox: false};
    setTasks([newTask, ...tasks]);
  }

  const changeTaskStatus = (id: string, isDone: boolean) => {
    const task = tasks.find(i => i.id === id);

    if(task) {
      task.checkbox = isDone;
    }
    setTasks([...tasks]);
  }

  return (
    <div className="App">
      <Todolist
        title={'What to learn'}
        tasks={filtered}
        removeTask={removeTask}
        changeFilter={changeFilter}
        filter={filter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>);

}

export default App;
