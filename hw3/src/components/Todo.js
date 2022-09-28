import React from 'react';
import xIcon from '../img/x.png';

function Todo(props) {
    return (
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input type="checkbox" id={props.id} />
                <label htmlFor={props.id} />
            </div>
            <h1 className="todo-app__item-detail">{props.name}</h1>
            <img alt="x-icon" src={xIcon} className="todo-app__item-x" />
        </li>
    );
}

export default Todo;
