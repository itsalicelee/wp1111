import './App.css';
import './styles.css';
import { useState } from 'react';
import Todo from './components/Todo';
import Footer from './components/Footer';
import Input from './components/Input';


function App() {
    const [tasks, setTasks] = useState([]);
    const [todoId, setTodoId] = useState(0);
    const [activeTask, setActiveTask] = useState([]);
    const [filter, setFilter] = useState('All');

    let getActiveTask = () => tasks.filter((task) => task.completed === false);

    return (
        <div id="root" className="todo-app__root">
            <header className="todo-app__header">
                <h1 className="todo-app__title">todos</h1>
            </header>
            <section className="todo-app__main">
                <Input
                    tasks={tasks}
                    setTasks={setTasks}
                    todoId={todoId}
                    setTodoId={setTodoId}
                    setActiveTask={setActiveTask}
                />
                <ul className="todo-app__list" id="todo-list" style={{ display: tasks.length > 0 ? '' : 'none' }}>
                    <Todo tasks={tasks} setTasks={setTasks} setActiveTask={setActiveTask} filter={filter}/>
                </ul>
            </section>
            <Footer
                todoLength={tasks.length}
                activeTaskNum={getActiveTask().length}
                tasks={tasks}
                setTasks={setTasks}
                filter={filter}
                setFilter={setFilter}
            />
        </div>
    );
}

export default App;
