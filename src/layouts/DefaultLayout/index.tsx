import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import './styles.module.scss'

export function DefaultLayout() {
    return (
        <div>
            <Header />

            <main>
                <Outlet />
            </main>
        </div>
    )

}