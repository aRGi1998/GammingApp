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
                                <a href="/student-list" className="nav-link text-white">Student List</a> |
                                <a href="/question-list" className="nav-link text-white">Question List</a> |
                            </>
                        ) : (
                            <>
                                <a href="/home" className="nav-link text-white">Home</a>
                                |
                                <a href="/edit" className="nav-link text-white">Levels</a>
                                |
                            </>
                        )}
                        <a href="#" onClick={handleLogout} className="nav-link text-white">Logout</a>
                    </nav>
                </div>
                <div className="mt-4 d-flex justify-content-between align-items-center">
                    <h3> Hello {savedName}</h3>
                </div>
            </div>
        </header>
    );
}

export default Header;
