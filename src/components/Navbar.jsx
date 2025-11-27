import { Link } from 'react-router-dom';
import { BookOpen, Home, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar glass-panel">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand">
                        <BookOpen className="brand-icon" />
                        <span className="brand-text">Seerah Journey</span>
                    </Link>

                    <div className="navbar-links">
                        <Link to="/" className="nav-link">
                            <Home size={18} />
                            <span>Home</span>
                        </Link>
                        <Link to="/yasir-qadhi" className="nav-link">
                            <User size={18} />
                            <span>Yasir Qadhi</span>
                        </Link>
                        <Link to="/abdul-nasir-jangda" className="nav-link">
                            <User size={18} />
                            <span>Abdul Nasir Jangda</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
