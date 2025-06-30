// * Action types for todos
export const SET_TODOS = 'SET_TODOS'               // Replace the current list of todos
export const ADD_TODO = 'ADD_TODO'                 // Add a new todo
export const REMOVE_TODO = 'REMOVE_TODO'           // Remove a todo by ID
export const TOGGLE_TODO = 'TOGGLE_TODO'           // Toggle the done/undone state
export const SET_IS_LOADING = 'SET_IS_LOADING'     // Update loading state (true/false)
export const SET_FILTER = 'SET_FILTER'             // Change current filter ('all' / 'done' / 'active')
export const UNDO_TODOS = 'UNDO_TODOS'             // Revert to previous todos list (before delete)


// * Initial state for the todos module
const initialState = {
    todos: [],           // Array of todo objects: { id, txt, isDone }
    isLoading: false,    // Used to show a loading spinner while fetching data
    filterBy: 'all',     // Current filter applied to todos list
    lastTodos: []        // Backup for undo functionality
}


// * Reducer function: receives the current state and an action (cmd)
// * Returns a new updated state based on the action type
export function todoReducer(state = initialState, cmd) {
    switch (cmd.type) {

        // Set (replace) the todos array
        case SET_TODOS:
            return {
                ...state,
                todos: cmd.todos
            }

        // Add a single todo to the list
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, cmd.todo]
            }

        // Remove a todo and save the previous list to lastTodos for undo
        case REMOVE_TODO:
            return {
                ...state,
                lastTodos: [...state.todos],
                todos: state.todos.filter(todo => todo.id !== cmd.todoId)
            }

        // Toggle a todo's isDone status by ID
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === cmd.todoId
                        ? { ...todo, isDone: !todo.isDone }
                        : todo
                )
            }

        // Update loading state (e.g., true while fetching data)
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        // Change the current filter (e.g., to show only 'done' or 'active' todos)
        case SET_FILTER:
            return {
                ...state,
                filterBy: cmd.filterBy
            }

        // Restore the previous todos list (undo last removal)
        case UNDO_TODOS:
            return {
                ...state,
                todos: [...state.lastTodos],
                lastTodos: []
            }

        // Return the current state unchanged if action type is unknown
        default:
            return state
    }
}

// store.dispatch({ type: ADD_TODO, todo: { id: 't101', txt: 'Buy milk', isDone: false } })
// store.dispatch({ type: TOGGLE_TODO, todoId: 't101' })
// store.dispatch({ type: SET_FILTER, filterBy: 'done' })
