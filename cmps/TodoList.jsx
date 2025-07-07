import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM
const { useSelector } = ReactRedux

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const color = (user && user.prefs && user.prefs.color) ? user.prefs.color : '#000000'
    const bgColor = (user && user.prefs && user.prefs.bgColor) ? user.prefs.bgColor : '#ffffff'

    return (
        <ul
            className="todo-list"
            style={{ color, backgroundColor: bgColor }}
        >
            {todos.map(todo =>
                <li key={todo._id} style={{ '--todo-color': todo.color }}>
                    <TodoPreview
                        todo={todo}
                        onToggleTodo={() => onToggleTodo(todo)}
                    />
                    <section>
                        <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                        <button>
                            <Link to={`/todo/${todo._id}`}>Details</Link>
                        </button>
                        <button>
                            <Link to={`/todo/edit/${todo._id}`}>Edit</Link>
                        </button>
                    </section>
                </li>
            )}
        </ul>
    )
}

