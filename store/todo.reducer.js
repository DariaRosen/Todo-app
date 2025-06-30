// // Manages todo list + isLoading + filterBy

// const { createSlice } = Redux
// // import { createSlice } from '@reduxjs/toolkit'
// const initialState = {
//   todos: [],
//   isLoading: false,
//   filterBy: 'all',
// }

// const todoSlice = createSlice({
//   name: 'todo',
//   initialState,
//   reducers: {
//     setTodos(state, action) {
//       state.todos = action.payload
//     },
//     setIsLoading(state, action) {
//       state.isLoading = action.payload
//     },
//     setFilter(state, action) {
//       state.filterBy = action.payload
//     },
//     addTodo(state, action) {
//       state.todos.push(action.payload)
//     },
//     removeTodo(state, action) {
//       state.todos = state.todos.filter(todo => todo.id !== action.payload)
//     },
//     toggleTodo(state, action) {
//       const todo = state.todos.find(t => t.id === action.payload)
//       if (todo) todo.isDone = !todo.isDone
//     }
//   }
// })

// export const {
//   setTodos,
//   setIsLoading,
//   setFilter,
//   addTodo,
//   removeTodo,
//   toggleTodo
// } = todoSlice.actions

// export default todoSlice.reducer
