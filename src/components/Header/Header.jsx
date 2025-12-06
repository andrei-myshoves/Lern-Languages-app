import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
                >
                    Profile
                </NavLink>
            </nav>
        </header>
    )
}
