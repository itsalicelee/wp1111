import React from 'react';
import xIcon from '../img/x.png';

function Input(props) {
    const handleKeyDown = (event) => {
        // event.keyCode to ensure Chinese input
        if (event.key === 'Enter' && event.keyCode === 13) {
            const toAdd = event.target.value; // get the input text
            event.target.value = ''; // clear input field
            console.log(toAdd);
        }
    };

    return (
        <input className="todo-app__input" type="text" onKeyDown={handleKeyDown} placeholder="What needs to be done?" />
    );
}

export default Input;
