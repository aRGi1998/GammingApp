import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function StatusPage() {
    const [gameStatus, setGameStatus] = useState({});
    const navigate = useNavigate();
    const token = sessionStorage.getItem('accessToken');

    useEffect(() => {
        const fetchGameStatus = async () => {
            try {
                const response = await axios.get('https://api-flrming.dhoomaworksbench.site/user-game-update', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setGameStatus(response.data);
                console.log(response.data,'data')
            } catch (error) {
                console.error('Error fetching game status:', error);
            }
        };

        fetchGameStatus();
    }, [token]);

    const handleSubmit = () => {
        navigate('/home');
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                            <div className="text-center">
                                <h2 style={{color:'black'}} className="mb-4">Your Current Level</h2>
                                <p style={{color:'black'}} className="lead mb-4">Nice going! You're now at Level {gameStatus.level}, Game {gameStatus.game}. Keep up the awesome work!</p>
                                <button style={{marginLeft:'0px'}} className="btn btn-primary mt-4" onClick={handleSubmit}>Back to Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default StatusPage;
