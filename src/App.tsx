import React from 'react';
import './App.css';
import Todolist from './components/Todolist/Todolist';

const tasks = [
  {id: 1, title: 'HTML', checkbox: true},
  {id: 2, title: 'CSS', checkbox: true},
  {id: 3, title: 'React', checkbox: false},
  {id: 4, title: 'React', checkbox: false},
  {id: 5, title: 'React', checkbox: true},
]

const tasks1 = [
  {id: 4, title: 'milk', checkbox: true},
  {id: 5, title: 'beer', checkbox: false},
  {id: 6, title: 'water', checkbox: false},
]

const newArr = tasks.map(function (i) {
  return i;
});

console.log(newArr === tasks)

function App() {
  return (
    <div className="App">
      <Todolist title={'What to learn'} tasks={tasks}/>
      <Todolist title={'What to bye'} tasks={tasks1}/>
    </div>);

}

export default App;
