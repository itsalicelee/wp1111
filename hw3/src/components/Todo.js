import React from 'react';
import xIcon from '../img/x.png';

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};

const getFilteredTasks = (props) => {
    let tasks = props.tasks;
    return tasks.filter(FILTER_MAP[props.filter]);
};

function Todo(props) {
    let tasks = props.tasks;

    function handleCheck(event) {
        let changedTask = tasks.find((task) => task.id.toString() === event.target.id);
        changedTask.completed = !changedTask.completed;
        // add or delete completed class for css styling
        const h1 = event.target.parentNode.parentNode.childNodes[1];
        if (changedTask.completed) h1.classList.add('todo-app__item-completed');
        else h1.classList.remove('todo-app__item-completed');
        props.setActiveTask([tasks.filter((task) => task.completed === false)]);
    }

    const handleClick = (event) => {
        props.setTasks(props.tasks.filter((task) => task.id.toString() !== event.target.id));
    };

    const filteredTasks = getFilteredTasks(props);

    return filteredTasks.filter(FILTER_MAP[props.filter]).map((task) => (
        <li className="todo-app__item" key={task.id}>
            <div className="todo-app__checkbox">
                <input type="checkbox" id={task.id} onChange={(e) => handleCheck(e)} checked={task.completed} />
                <label htmlFor={task.id} />
            </div>
            <h1 className={task.completed ? 'todo-app__item-detail todo-app__item-completed' : 'todo-app__item-detail'}>
                {task.name}
            </h1>
            <img alt="x-icon" id={task.id} src={xIcon} className="todo-app__item-x" onClick={handleClick} />
        </li>
    ));
}

export default Todo;
