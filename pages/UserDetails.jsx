const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { useParams } = ReactRouterDOM

import { userService } from '../services/user.service.js'
import { setUser } from '../store/actions/user.actions.js'

// export function UserDetails() {
//     const { userId } = useParams()
//     const loggedInUser = useSelector(state => state.userModule.loggedInUser)
//     const dispatch = useDispatch()

//     const [user, setUserState] = useState(null)
//     const [fullname, setFullname] = useState('')
//     const [prefs, setPrefs] = useState({ darkMode: false })

//     const isOwnProfile = loggedInUser && loggedInUser._id === userId

//     useEffect(() => {
//         userService.getById(userId).then(user => {
//             setUserState(user)
//             setFullname(user.fullname || '')
//             setPrefs(user.prefs || {})
//         })
//     }, [userId])

//     function handleSave() {
//         const updatedUser = {
//             ...user,
//             fullname,
//             prefs,
//         }

//         userService.saveUserPrefs(updatedUser).then(savedUser => {
//             setUserState(savedUser)
//             if (isOwnProfile) dispatch(setUser(savedUser)) // Update Redux if it's me
//         })
//     }

//     if (!user) return <p>Loading user...</p>

//     return (
//         <section className="user-details">
//             <h2>User Details</h2>
//             <p><strong>Username:</strong> {user.username}</p>

//             {isOwnProfile ? (
//                 <>
//                     <label>
//                         Fullname:
//                         <input
//                             type="text"
//                             value={fullname}
//                             onChange={ev => setFullname(ev.target.value)}
//                         />
//                     </label>

//                     <label>
//                         <input
//                             type="checkbox"
//                             checked={prefs.darkMode}
//                             onChange={ev =>
//                                 setPrefs(prev => ({ ...prev, darkMode: ev.target.checked }))
//                             }
//                         />
//                         Dark Mode
//                     </label>

//                     <button onClick={handleSave}>Save Preferences</button>
//                 </>
//             ) : (
//                 <p><strong>Fullname:</strong> {user.fullname}</p>
//             )}
//         </section>
//     )
// }
