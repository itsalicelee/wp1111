import React from 'react';

function Input(props) {
    const handleKeyDown = (event) => {
        // event.keyCode to ensure Chinese input
        if (event.key === 'Enter' && event.keyCode === 13) {
            const toAdd = event.target.value; // get the input text
            event.target.value = ''; // clear input field
            const newTask = { id: props.todoId, name: toAdd, completed: false };
            props.setTasks([...props.tasks, newTask]);
            props.setTodoId((prev) => prev + 1);
        }
    };

    return (
        <input className="todo-app__input" type="text" onKeyDown={handleKeyDown} placeholder="What needs to be done?" />
    );
}

export default Input;
