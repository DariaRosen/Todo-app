const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'


export function AppHeader() {
    const navigate = useNavigate()
    //const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector(state => state.userModule.loggedInUser)
    console.log('AppHeader user', user)
    console.log('user in AppHeader:', user);

    function onLogout() {
        logout()
            // .then(() => {
            //     showSuccessMsg('Logged out successfully')
            // })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {
        // setUser(user)
        // navigate('/')
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    <section>
                        <Link to={`/user/${user._id}`}>Hello {user.fullname} (${user.balance})</Link>
                        <button onClick={onLogout}>Logout</button>
                    </section>
                ) : (
                    <section>
                        <LoginSignup onSetUser={onSetUser} />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
