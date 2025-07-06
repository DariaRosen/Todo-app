const { useState, useEffect } = React
const { useSelector } = ReactRedux
const { useParams } = ReactRouterDOM
import { userService } from '../services/user.service.js'  
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// * UserDetails - Displays and allows editing of the logged-in user's profile
export function UserDetails() {
    // Get the currently logged-in user from Redux
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    // Local state for form inputs
    const [fullname, setFullname] = useState('')
    const [color, setColor] = useState('#000000')
    const [bgColor, setBgColor] = useState('#000000')

    // Load user data into the form when the component mounts or user changes
    useEffect(() => {
        if (loggedInUser) {
            setFullname(loggedInUser.fullname || '')
            setColor(loggedInUser.color || '#000000')
            setBgColor(loggedInUser.bgColor || '#000000')
        }
    }, [loggedInUser])

    // Handle Save button click
 function onSave(ev) {
    ev.preventDefault()
    const updatedUser = { ...loggedInUser, fullname, color, bgColor }

    userService.saveUserPrefs(updatedUser)
        .then(() => {
            showSuccessMsg('Preferences saved successfully!')
        })
        .catch(err => {
            console.error('Failed to save preferences:', err)
            showErrorMsg('Failed to save preferences')
        })
}

    if (!loggedInUser) return <div>Loading...</div>

    return (
        <section className="user-details">
            <h2>Profile</h2>

            <form onSubmit={onSave} className="user-form">
                <label>
                    Name:
                    <input
                        type="text"
                        placeholder="Your name"
                        value={fullname}
                        onChange={ev => setFullname(ev.target.value)}
                    />
                </label>

                <label>
                    Color:
                    <input
                        type="color"
                        value={color}
                        onChange={ev => setColor(ev.target.value)}
                    />
                </label>

                <label>
                    BG Color:
                    <input
                        type="color"
                        value={bgColor}
                        onChange={ev => setBgColor(ev.target.value)}
                    />
                </label>

                <button type="submit">Save</button>
            </form>
        </section>
    )
}
