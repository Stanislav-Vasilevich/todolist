import React, {useState} from 'react';
import './App.css';
import Todolist from './components/Todolist/Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: 'HTML', checkbox: true},
    {id: 2, title: 'CSS', checkbox: true},
    {id: 3, title: 'JS', checkbox: true},
    {id: 4, title: 'React', checkbox: false},
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeTask = (id: number) => {
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

  return (
    <div className="App">
      <Todolist
        title={'What to learn'}
        tasks={filtered}
        removeTask={removeTask}
        changeFilter={changeFilter}
        filter={filter}
      />
    </div>);

}

export default App;
