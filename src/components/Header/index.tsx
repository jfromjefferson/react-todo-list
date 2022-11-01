import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <h2>Vibbra ToDo list</h2>

                <nav>
                    <NavLink to="/" end>
                        <span>Inicio</span>
                    </NavLink>

                    {/* <NavLink to="/items" end>
                        <span>Items</span>
                    </NavLink> */}

                    <NavLink to="/about" end>
                        <span>Sobre</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}