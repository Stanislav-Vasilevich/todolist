import React from 'react';
import {TaskType} from '../App/App';

type PropsType = {
  tasks: Array<TaskType>
}

const Todolist = (props: PropsType) => {
  return (
    <div>
      <h2>What to learn?</h2>
      <div>
        <input type="text"/>
        <button>+</button>
      </div>
      <ul>
        <li>
          <input type="checkbox"/>HTML&CSS
        </li>
        <li>
          <input type="checkbox"/>JS
        </li>
        <li>
          <input type="checkbox"/>React
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
