import React from 'react';

function Footer(props) {
    let displayState = props.todoLength > 0 ? '' : 'none';

    return (
        <footer id="todo-footer" className="todo-app__footer" style={{ display: displayState }}>
            <div className="todo-app__total">2 left</div>
            <ul className="todo-app__view-buttons">
                <button> All </button>
                <button> Active </button>
                <button> Completed </button>
            </ul>
            <div className="todo-app__clean">
                <button> Clear Completed </button>
            </div>
        </footer>
    );
}

export default Footer;
