import './App.css';
import './styles.css';
import { useState } from 'react';
import Todo from './components/Todo';
import Footer from './components/Footer';
import Input from './components/Input';
function App() {
    const [tasks, setTasks] = useState([]);
    const [todoId, setTodoId] = useState(0);

    return (
        <div id="root" className="todo-app__root">
            <header className="todo-app__header">
                <h1 className="todo-app__title">todos</h1>
            </header>
            <section className="todo-app__main">
                <Input tasks={tasks} setTasks={setTasks} todoId={todoId} setTodoId={setTodoId} />
                <ul className="todo-app__list" id="todo-list" style={{ display: tasks.length > 0 ? '' : 'none' }}>
                    <Todo tasks={tasks} />
                </ul>
            </section>
            <Footer todoLength={tasks.length} />
        </div>
    );
}

export default App;
