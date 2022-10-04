import React from 'react';

function Footer(props) {
    let displayState = props.todoLength > 0 ? '' : 'none';

    function handleClearCompleted(event) {
        props.setTasks(props.tasks.filter((task) => task.completed === false));
    }
    return (
        <footer id="todo-footer" className="todo-app__footer" style={{ display: displayState }}>
            <div className="todo-app__total">{props.activeTaskNum} left</div>
            <ul className="todo-app__view-buttons">
                <button id="button_all" onClick={() => props.setFilter('All')}>
                    All
                </button>
                <button id="button_active" onClick={() => props.setFilter('Active')}>
                    Active
                </button>
                <button id="button_completed" onClick={() => props.setFilter('Completed')}>
                    Completed
                </button>
            </ul>
            <div className="todo-app__clean">
                <button
                    id="button_clearCompleted"
                    style={{ visibility: props.displayClearCompleted }}
                    onClick={handleClearCompleted}
                >
                    Clear Completed
                </button>
            </div>
        </footer>
    );
}

export default Footer;
