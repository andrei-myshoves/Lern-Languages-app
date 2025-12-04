export const BrowserRouter = ({ children }) => children

export const NavLink = ({ children, to }) => {
    return <a href={to}>{children}</a>
}

export const Link = ({ children, to }) => {
    return <a href={to}>{children}</a>
}

export const Routes = ({ children }) => children
export const Route = ({ element }) => element

export default {
    BrowserRouter,
    NavLink,
    Link,
    Routes,
    Route,
}
