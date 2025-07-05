import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {

    return (
        <ul className="todo-list">
            {todos.map(todo =>
                // Each todo list item uses a CSS variable to set the background color
                <li key={todo._id} style={{ '--todo-color': todo.color }}>
                    {/* Todo preview includes main info and toggle functionality */}
                    <TodoPreview
                        todo={todo}
                        onToggleTodo={() => onToggleTodo(todo)}
                    />

                    {/* Action buttons: Remove, Details, Edit */}
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
