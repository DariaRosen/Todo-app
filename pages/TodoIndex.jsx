
const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

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
import { setFilter } from '../store/actions/todo.actions.js'

import { ADD_TODO, SET_TODOS } from '../store/reducers/todo.reducer.js'




export function TodoIndex() {
    // * Get todos and filterBy from Redux store
    const todos = useSelector(state => state.todoModule.todos)
    const filterBy = useSelector(state => state.todoModule.filterBy)

    // * Get the dispatch function to send actions to Redux
    const dispatch = useDispatch()


    useEffect(() => {
        loadTodos(filterBy)
            .then(() => showSuccessMsg('Todos loaded'))
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

     function handleFilterChange(ev) {
        const selected = ev.target.value
        setFilter(selected)
    }

    // // * Set new filter (merges into previous filterBy)
    // function onSetFilter(newFilter) {
    //     dispatch({ type: 'SET_FILTER', filterBy: newFilter })
    // }
    function onSetFilter(newFilter) {
        setFilter(newFilter)
    }

    const filteredTodos = todos.filter(todo => {
        if (filterBy === 'DONE') return todo.isDone
        if (filterBy === 'ACTIVE') return !todo.isDone
        return true
    })

    // * Remove a todo by ID
    function onRemoveTodo(todoId) {
        const isConfirmed = window.confirm('Are you sure you want to delete this todo?')
        if (!isConfirmed) return

        removeTodo(todoId)
            .then(() => showSuccessMsg(`Todo removed`))
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
        saveTodo(newTodo)
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
            <select onChange={handleFilterChange} value={filterBy}>
                <option value="ALL">All</option>
                <option value="ACTIVE">Active</option>
                <option value="DONE">Done</option>
            </select>
            
            {/* List Display */}
            <h2>Todos List</h2>
            <TodoList
                todos={filteredTodos}
                onRemoveTodo={onRemoveTodo}
                onToggleTodo={onToggleTodo}
            />

            {/* Optional Table View */}
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable
                    todos={filteredTodos}
                    onRemoveTodo={onRemoveTodo}
                />
            </div>
        </section>
    )
}