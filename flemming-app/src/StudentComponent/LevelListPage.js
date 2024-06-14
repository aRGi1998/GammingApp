import React, { useEffect, useState } from 'react';
import axios from 'axios';
import lock from '../assests/lock.png';
import { useNavigate } from 'react-router-dom';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function LevelListPage() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getGameData();
    }, []);

    const refreshAccessToken = () => {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (!refreshToken) {
            console.error('Refresh token not found in local storage');
            return Promise.reject('No refresh token');
        }

        return axios.post('https://api-flrming.dhoomaworksbench.site/api/token/refresh/', {
            refresh: refreshToken
        })
            .then(response => {
                const { access } = response.data;
                sessionStorage.setItem('accessToken', access);
                return access;
            })
            .catch(error => {
                console.error('Error refreshing access token:', error);
                return Promise.reject('Token refresh failed');
            });
    };

    const getGameData = () => {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            console.error('Access token not found in local storage');
            return;
        }

        axios.get('https://api-flrming.dhoomaworksbench.site/api/game/type/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setGames(response.data.results);
            })
            .catch(error => {
                if (error.response && error.response.data.code === 'token_not_valid') {
                    console.log('Token expired, refreshing token...');
                    refreshAccessToken().then(newToken => {
                        if (newToken) {
                            axios.get('https://api-flrming.dhoomaworksbench.site/api/game/type/', {
                                headers: {
                                    Authorization: `Bearer ${newToken}`
                                }
                            })
                                .then(response => {
                                    setGames(response.data.results);
                                })
                                .catch(error => {
                                    console.error('Error fetching game data with new token:', error);
                                    setError('Failed to fetch game data.');
                                });
                        }
                    });
                } else {
                    console.error('Error fetching game data:', error);
                    setError('Failed to fetch game data.');
                }
            });
    };

    const navigate = useNavigate();
    const navigateToTask = (taskId) => {
        const url = `/game-list?taskId=${taskId}`;
        navigate(url);
    };


    const taskColors = [
        'rgb(19, 203, 28)',
        'rgb(16, 241, 94)',
        'rgb(19, 223, 91)',
        'rgb(19, 223, 148)',
        'rgb(11, 156, 103)',
        'rgb(132, 156, 11)',
        'rgb(11, 103, 156)',
        'rgb(110, 11, 156)',
        'rgb(156, 11, 98)',
        'rgb(255, 15, 15)'
    ];

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                            <div className="levels-page mt-5">
                                {error && <div className="error-message" style={{ color: 'white' }}>{error}</div>}
                                <div className="container oval-container mt-5" >
                                    {games.map((game, index) => (
                                        <div key={game.id} id={`task-${game.id}`} className="oval-button mb-3" style={{ backgroundColor: taskColors[index % taskColors.length] }} onClick={() => navigateToTask(game.id)}>
                                            <div className="left-side">*</div>
                                            <span style={{ cursor: 'pointer' }}>{game.tittle}</span>
                                            <div className="right-side">
                                                <img src={lock} alt="Lock" style={{ width: '20px', height: '20px', color: 'white' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ position: 'absolute', bottom: '0', width: '100%' }} />
        </>
    );
}

export default LevelListPage;
