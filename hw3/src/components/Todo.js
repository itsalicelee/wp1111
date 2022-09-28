import React from 'react';
import xIcon from '../img/x.png';

function Todo(props) {
    return props.tasks.map((task) => (
        <li className="todo-app__item" key={task.id}>
            <div className="todo-app__checkbox">
                <input type="checkbox" id={task.id} />
                <label htmlFor={task.id} />
            </div>
            <h1 className="todo-app__item-detail">{task.name}</h1>
            <img alt="x-icon" src={xIcon} className="todo-app__item-x" />
        </li>
    ));
}

export default Todo;
