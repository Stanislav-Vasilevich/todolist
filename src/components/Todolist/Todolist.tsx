import React from 'react';

type PropsType = {
  title: string
  tasks: Array<TaskType>
}

type TaskType = {
  id: number
  title: string
  checkbox: boolean
}

const Todolist = (props: PropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {
          props.tasks.map(function (elem) {
          return (
            <li>
              <input type="checkbox" checked={elem.checkbox}/>
              <span>{elem.title}</span> <span>{elem.id}</span>
            </li>
          )
        })
        }
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}

export default Todolist;
