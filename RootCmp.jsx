// * Import React Router and Redux dependencies
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
const { Provider } = ReactRedux

// * Import components and pages
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { TodoIndex } from "./pages/TodoIndex.jsx"
import { TodoDetails } from "./pages/TodoDetails.jsx"
import { TodoEdit } from "./pages/TodoEdit.jsx"
import { AboutTeam } from "./cmps/AboutTeam.jsx"
import { AboutVision } from "./cmps/AboutVision.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"

// * Import Redux store
import { store } from './store/store.js'

// * RootCmp is your top-level component that wraps the whole app
export function RootCmp() {
    return (
        // * Provide the Redux store to the whole app
        <Provider store={store}>
            {/* Use HashRouter for routing (good for GitHub Pages / file-based deployments) */}
            <Router>
                <section className="app main-layout">
                    {/* Always show the app header */}
                    <AppHeader />

                    {/* The main content area (changes based on route) */}
                    <main>
                        <Routes>
                            {/* Home page */}
                            <Route path="/" element={<Home />} />

                            {/* About page with nested sub-routes */}
                            <Route path="/about" element={<About />}>
                                <Route path="team" element={<AboutTeam />} />
                                <Route path="vision" element={<AboutVision />} />
                            </Route>

                            {/* Todo Details */}
                            <Route path="/todo/:todoId" element={<TodoDetails />} />

                            {/* Edit existing or add new Todo */}
                            <Route path="/todo/edit/:todoId" element={<TodoEdit />} />
                            <Route path="/todo/edit" element={<TodoEdit />} />

                            {/* Todos List */}
                            <Route path="/todo" element={<TodoIndex />} />

                            {/* Dashboard page */}
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}
