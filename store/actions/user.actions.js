import { userService } from "../../services/user.service.js"
//import { CLEAR_CART, TOGGLE_CART_IS_SHOWN } from "../reducers/todo.reducer.js"
import { SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}


export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            sessionStorage.setItem('loggedinUser', JSON.stringify(user)) // 🔸 add this
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}


export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
            //store.dispatch({ type: TOGGLE_CART_IS_SHOWN })
            //store.dispatch({ type: CLEAR_CART })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
            throw err
        })
}


export function checkout(diff) {
    return userService.updateScore(-diff)
        .then()
        .catch((err) => {
            console.log('user actions -> Cannot checkout', err)
            throw err
        })
}

export function setUser(user) {
    return (dispatch) => {
        dispatch({ type: 'SET_USER', user })
    }
}
