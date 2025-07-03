export const ADD_FOLLOWER = 'ADD_FOLLOWER'
export const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER'


const initialState = {
    count: 1000005
}

export function getFollowersReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case 'ADD_FOLLOWER':
            return { ...state, count: state.count + 1 }
        case 'REMOVE_FOLLOWER':
            return { ...state, count: state.count - 1 }
        default:
            return state
    }
}