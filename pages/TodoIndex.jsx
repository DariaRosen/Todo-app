
// import { DataTable } from "../cmps/data-table/DataTable.jsx"
// import { addTodo, setFilter } from '../store/reducers/todo.reducer.js'

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

// * Import reusable components
import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { DataTable } from '../cmps/data-table/DataTable.jsx'

// * Import services
import { todoService } from '../services/todo.service.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// * Import Redux actions
import { loadTodos } from '../store/actions/todo.actions.js'
import { removeTodo } from '../store/actions/todo.actions.js'
import { saveTodo } from '../store/actions/todo.actions.js'
import { toggleTodo } from '../store/actions/todo.actions.js'

import { ADD_TODO, SET_TODOS } from '../store/reducers/todo.reducer.js'




export function TodoIndex() {
    // * Get todos and filterBy from Redux store
    const todos = useSelector(state => state.todoState.todos)
    // const [filterBy, setFilterBy] = useSelector(state => state.todoState.filterBy)
    const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter())

    // * Get the dispatch function to send actions to Redux
    const dispatch = useDispatch()


    // const [todos, setTodos] = useState(null)

    // // Special hook for accessing search-params:
    // const [searchParams, setSearchParams] = useSearchParams()

    // const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    // const [filterBy, setFilterBy] = useState(defaultFilter)

    // * Load todos from backend/store on first load or when filter changes

    useEffect(() => {
        loadTodos(filterBy)
            .then(() => showSuccessMsg('Todos loaded'))
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    // * Set new filter (merges into previous filterBy)
    function onSetFilter(newFilter) {
        dispatch({ type: 'SET_FILTER', filterBy: newFilter })
    }

    // * Remove a todo by ID
    function onRemoveTodo(todoId) {
        // todoService.remove(todoId)
        dispatch(removeTodo(todoId))
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    // * Create and save a new random todo
    function onAddTodo() {
        const txt = prompt('Enter todo text:')
        if (!txt) return
        const newTodo = todoService.getEmptyTodo(txt)
        // TODO: use dispatch/action
        // dispatch({ type: ADD_CAR_TO_CART, car })
        dispatch(saveTodo(newTodo))
            .then(() => showSuccessMsg('Todo added'))
            .catch(() => showErrorMsg('Cannot add todo'))
    }

    // * Toggle isDone status of a todo
    function onToggleTodo(todoId) {
        // const todoToSave = { ...todo, isDone: !todo.isDone }
        //   todoService.save(todoToSave)
        dispatch(toggleTodo(todoId))
            .then((savedTodo) => {
                setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }

    if (!todos) return <div>Loading...</div>

    return (
        <section className="todo-index">
            {/* Filter UI */}
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilter} />

            {/* Add Todo Buttons */}
            <div>
                <button onClick={onAddTodo}>Add Random Todo ✨</button>
                <Link to="/todo/edit" className="btn">Add Todo (Form)</Link>
            </div>

            {/* List Display */}
            <h2>Todos List</h2>
            <TodoList
                todos={todos}
                onRemoveTodo={onRemoveTodo}
                onToggleTodo={onToggleTodo}
            />

            {/* Optional Table View */}
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable
                    todos={todos}
                    onRemoveTodo={onRemoveTodo}
                />
            </div>
        </section>
    )
}