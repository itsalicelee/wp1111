import logo from './logo.svg';
import './App.css';
import './styles.css';
import xIcon from './img/x.png';
import { useState } from 'react';
import Todo from './components/Todo';
import Footer from './components/Footer';
import Input from './components/Input';
function App() {
    const DATA = [
        { id: '0', name: 'Eat', completed: true },
        { id: '1', name: 'Sleep', completed: false },
        { id: '2', name: 'Repeat', completed: false },
    ];
    const taskList = DATA.map((task) => <Todo id={task.id} name={task.name} completed={task.completed} key={task.id}/>);
    return (
        <div id="root" className="todo-app__root">
            <header className="todo-app__header">
                <h1 className="todo-app__title">todos</h1>
            </header>
            <section className="todo-app__main">
                <Input />
                {/* <input className="todo-app__input" placeholder="What needs to be done?" /> */}

                <ul className="todo-app__list" id="todo-list" style={{ display: DATA.length > 0 ? '' : 'none' }}>
                    {taskList}
                    {/* <ul className="todo-app__list" id="todo-list">
                    <li className="todo-app__item">
                        <div className="todo-app__checkbox">
                            <input type="checkbox" id="0" />
                            <label htmlFor="0" />
                        </div>
                        <h1 className="todo-app__item-detail">This is the first TODO</h1>
                        <img alt="x-icon" src={xIcon} className="todo-app__item-x" />
                    </li>
                    <li className="todo-app__item">
                        <div className="todo-app__checkbox">
                            <input type="checkbox" id="1" />
                            <label htmlFor="1" />
                        </div>
                        <h1 className="todo-app__item-detail">This is the second TODO</h1>
                        <img alt="x-icon" src={xIcon} className="todo-app__item-x" />
                    </li>
                    <li className="todo-app__item">
                        <div className="todo-app__checkbox">
                            <input type="checkbox" id="2" />
                            <label htmlFor="2" />
                        </div>
                        <h1 className="todo-app__item-detail">This is the third TODO</h1>
                        <img alt="x-icon" src={xIcon} className="todo-app__item-x" />
                    </li>
                </ul> */}
                </ul>
            </section>
            <Footer todoLength={DATA.length} />
            {/* <footer id="todo-footer" className="todo-app__footer">
                <div className="todo-app__total">2 left</div>
                <ul className="todo-app__view-buttons">
                    <button> All </button>
                    <button> Active </button>
                    <button> Completed </button>
                </ul>
                <div className="todo-app__clean">
                    <button> Clear Completed </button>
                </div>
            </footer> */}
        </div>
    );
}

export default App;
