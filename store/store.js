// Import reducers (logic to update each part of the state)
import { todoReducer } from './reducers/todo.reducer.js'
import { userReducer } from './reducers/user.reducer.js'

// Get Redux functions from the global Redux object (from <script src="https://unpkg.com/redux">)
const { createStore, combineReducers, compose } = Redux

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
    // 'todoState' and 'userState' are keys in the global store
    todoState: todoReducer,
    userState: userReducer
})

// Enable Redux DevTools if it's available, otherwise fallback to default compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create the Redux store using the root reducer and enhancers
export const store = createStore(rootReducer, composeEnhancers())

// Log the initial state of the store to the console
console.log('Initial store state:', store.getState())

// Optional: subscribe to every change in the store (useful for debugging)
// store.subscribe(() => {
//     console.log('Store updated:', store.getState())
// })
