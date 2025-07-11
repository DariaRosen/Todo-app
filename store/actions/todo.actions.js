import { todoService } from "../../services/todo.service.js"
import {
    SET_TODOS,
    ADD_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
    SET_IS_LOADING,
    SET_FILTER,
} from "../reducers/todo.reducer.js"
import { store } from "../store.js"
import { userService } from "../../services/user.service.js"

export function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.error('todo action -> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function saveTodo(todoToSave) {
    debugger
    const type = todoToSave._id ? UPDATE_TODO : ADD_TODO
    const actionText = todoToSave._id
        ? `Updated the Todo: '${todoToSave.txt}'`
        : `Added a Todo: '${todoToSave.txt}'`

    return todoService.save(todoToSave)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            const user = userService.getLoggedinUser()
            if (user) {
                user.activities = user.activities || []
                user.activities.unshift({ txt: actionText, at: Date.now() })
                userService.saveUserPrefs(user)
            }
            return savedTodo
        })
        .catch(err => {
            console.error('todo action -> Cannot save todo', err)
            throw err
        })
}

export function removeTodo(todoId) {

    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
            const user = userService.getLoggedinUser()
            if (user) {
                user.activities = user.activities || []
                user.activities.unshift({ txt: `Removed a Todo (id: '${todoId}')`, at: Date.now() })
                userService.saveUserPrefs(user)
            }
        })
        .catch(err => {
            console.error('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function toggleTodo(todoId) {
    return todoService.toggle(todoId)
        .then((updatedTodo) => {
            store.dispatch({ type: UPDATE_TODO, todo: updatedTodo })
            return updatedTodo
        })
        .catch(err => {
            console.error('todo action -> Cannot toggle todo', err)
            throw err
        })
}

export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}
