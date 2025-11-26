import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navigation">
            <div className="nav-brand">
                <Link to="/">
                    <h2>💻 Трекер технологий</h2>
                </Link>
            </div>

            <ul className="nav-menu">
                <li>
                    <Link
                        to="/"
                        className={isActive('/') ? 'nav-link active' : 'nav-link'}
                    >
                        🏠 Главная
                    </Link>
                </li>
                <li>
                    <Link
                        to="/technologies"
                        className={isActive('/technologies') ? 'nav-link active' : 'nav-link'}
                    >
                        📚 Технологии
                    </Link>
                </li>
                <li>
                    <Link
                        to="/add-technology"
                        className={isActive('/add-technology') ? 'nav-link active' : 'nav-link'}
                    >
                        ➕ Добавить
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className={isActive('/dashboard') ? 'nav-link active' : 'nav-link'}
                    >
                        📊 Статистика
                    </Link>
                </li>
                <li>
                    <Link
                        to="/settings"
                        className={isActive('/settings') ? 'nav-link active' : 'nav-link'}
                    >
                        ⚙️ Настройки
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;