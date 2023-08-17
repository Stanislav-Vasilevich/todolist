import React from 'react';
import {FilterValuesType, TaskType} from './App';

type PropsType = {
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  setFilter: (status: FilterValuesType) => void
  removeTask: (taskId: string) => void
}

const Todolist = (props: PropsType) => {
  const setFilteredHandler = (status: FilterValuesType) => {
    props.setFilter(status);
  }

  return (
    <div className={'todolist'}>
      <div>
        <h3>{props.title}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          {
            props.tasks.map(i => {
              return (
                <li key={i.id}>
                  <input type="checkbox" checked={i.isDone}/> <span>{i.title}</span>
                  <button onClick={() => props.removeTask(i.id)}>x</button>
                </li>
              )
            })
          }
        </ul>
        <div>
          <button onClick={() => setFilteredHandler('all')}>All</button>
          <button onClick={() => setFilteredHandler('active')}>Active</button>
          <button onClick={() => setFilteredHandler('completed')}>Completed</button>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
