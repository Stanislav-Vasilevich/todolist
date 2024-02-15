import React from 'react';
import {TaskType} from '../App/App';

type PropsType = {
  title: string
  tasks: Array<TaskType>
}

const Todolist = (props: PropsType) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input type="text"/>
        <button>+</button>
      </div>
      <ul>
        <li>
          <input type="checkbox" checked={props.tasks[0].isDone}/>
          <span>{props.tasks[0].title}</span>
        </li>
        <li>
          <input type="checkbox" checked={props.tasks[1].isDone}/>
          <span>{props.tasks[1].title}</span>
        </li>
        <li>
          <input type="checkbox" checked={props.tasks[2].isDone}/>
          <span>{props.tasks[2].title}</span>
        </li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
