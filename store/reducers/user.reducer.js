// // Manages user object

//* Action types for user management
export const SET_USER = 'SET_USER'   // Set logged-in user
export const LOGOUT = 'LOGOUT'       // Clear user on logout

// * Initial state for the user module
const initialState = {
    user: null  // Logged-in user object (or null if logged out)
}

// * Reducer function for user state
export function userReducer(state = initialState, cmd) {
    switch (cmd.type) {

        // Set the current user
        case SET_USER:
            return { ...state, user: cmd.user }

        // Clear the user (e.g., on logout)
        case LOGOUT:
            return { ...state, user: null }

        // Unknown action – return current state
        default:
            return state
    }
}


// store.dispatch({ type: SET_USER, user: { fullName: 'Daria', email: 'daria@example.com' } })
// store.dispatch({ type: LOGOUT })
