import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assests/logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    const savedName = sessionStorage.getItem('userName');
    const isAdmin = sessionStorage.getItem('isStaff') === 'true';
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <header className="bg-black text-white py-3">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <nav className="d-flex align-items-center">
                        {isAdmin ? (
                            <>
                                <a href="/admin-home" className="nav-link text-white me-3">Home</a>
                                <a href="/student-list" className="nav-link text-white me-3">Student Lists</a>
                                <a href="/question-list" className="nav-link text-white me-3">Question Lists</a>
                                <a href="/score-board" className="nav-link text-white me-3">Score Board</a>
                            </>
                        ) : (
                            <>
                                <a href="/home" className="nav-link text-white me-3">Home</a>
                                <a href="/levels" className="nav-link text-white me-3">Levels</a>
                            </>
                        )}
                        <a href="#" onClick={handleLogout} className="nav-link text-white">Logout</a>
                    </nav>
                </div>
                <div className="mt-4 d-flex justify-content-between align-items-center">
                    <h3>Hello {capitalizeFirstLetter(savedName)}</h3>
                </div>
            </div>
        </header>
    );
}

export default Header;
