import { storageService } from "./async-storage.service.js"


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    addActivity
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = {
        username,
        password,
        fullname,
        balance: 10000,
        activities: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    // user.createdAt = user.updatedAt = Date.now()

    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

// function _setLoggedinUser(user) {
//     const userToSave = { _id: user._id, fullname: user.fullname }
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
//     return userToSave
// }

function _setLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}


function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'muki',
        password: 'muki1',
    }
}

function addActivity(txt) {
    console.log('Adding activity:', txt)
    const user = getLoggedinUser()
    if (!user) return Promise.reject('No logged-in user')

    user.activities = user.activities || []
    user.balance = user.balance || 0

    user.activities.unshift({ txt, at: Date.now() })
    user.balance += 10
    console.log('user.balance', user.balance)
    return storageService.put(STORAGE_KEY, user)
        .then((savedUser) => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(savedUser))
            return savedUser
        })
}


// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }