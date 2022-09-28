import logo from './logo.svg';
import './App.css';
import './styles.css';
import xIcon from './img/x.png';

function App() {
    return (
        <div id="root" className="todo-app__root">
            <header className="todo-app__header">
                <h1 className="todo-app__title">todos</h1>
            </header>
            <section className="todo-app__main">
                <input className="todo-app__input" placeholder="What needs to be done?" />
                <ul className="todo-app__list" id="todo-list">
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
                </ul>
            </section>
            <footer id="todo-footer" className="todo-app__footer">
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
        </div>
    );
}

export default App;
