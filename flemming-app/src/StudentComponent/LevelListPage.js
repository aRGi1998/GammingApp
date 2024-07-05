import React, { useEffect, useState } from 'react';
import axios from 'axios';
import lock from '../assests/lock.png';
import unlock from '../assests/unlock.png.png';
import redlocker from '../assests/Vector.png';
import { useNavigate } from 'react-router-dom';
import { levelStatusChecker } from '../utils/StatusChecker';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import Tenor from '../assests/tenor.gif';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

function LevelListPage() {
    const [games, setGames] = useState([]);
    const [taskIds, setTaskIds] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ message: '', imageUrl: false, linkUrl: '/game-list?taskId=1' });
    const navigate = useNavigate();
    const [allowed, setAllowed] = useState();

    useEffect(() => {
        getGameData();
    }, []);

    const refreshAccessToken = () => {
        const refreshToken = sessionStorage.getItem('refreshToken') || false;
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

    // const getGameData = () => {
    //     const token = sessionStorage.getItem('accessToken');
    //     if (!token) {
    //         console.error('Access token not found in local storage');
    //         return;
    //     }

    //     axios.get('https://api-flrming.dhoomaworksbench.site/user-game-type', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(response => {
    //             console.log(response, 'data');
    //             setGames(response.data.data);
    //             setTaskIds(response.data.data.map((data, index) => index + 1));
    //         })
    //         .catch(error => {
    //             if (error.response && error.response.data.code === 'token_not_valid') {
    //                 console.log('Token expired, refreshing token...');
    //                 refreshAccessToken().then(newToken => {
    //                     if (newToken) {
    //                         axios.get('https://api-flrming.dhoomaworksbench.site/user-game-type', {
    //                             headers: {
    //                                 Authorization: `Bearer ${newToken}`
    //                             }
    //                         })
    //                             .then(response => {
    //                                 setGames(response.data.data);
    //                                 setTaskIds(response.data.data.map((data, index) => index + 1));
    //                             })
    //                             .catch(error => {
    //                                 console.error('Error fetching game data with new token:', error);
    //                                 setError('Failed to fetch game data.');
    //                             });
    //                     }
    //                 })
    //                     .catch((err) => {
    //                         console.log(err);
    //                         navigate("/");
    //                     });
    //             } else {
    //                 console.error('Error fetching game data:', error);
    //                 setError('Failed to fetch game data.');
    //             }
    //         });
    // };

    const getGameData = () => {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            console.error('Access token not found in local storage');
            return;
        }

        axios.get('https://api-flrming.dhoomaworksbench.site/user-game-type', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response, 'data');
                setGames(response.data.data);
                setTaskIds(response.data.data.map((data, index) => index + 1));
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.data.detail === 'You do not have permission to perform this action.') {
                        alert('You do not have permission to play this game!');
                        navigate('/home');
                    } else if (error.response.data.code === 'token_not_valid') {
                        console.log('Token expired, refreshing token...');
                        refreshAccessToken().then(newToken => {
                            if (newToken) {
                                axios.get('https://api-flrming.dhoomaworksbench.site/user-game-type', {
                                    headers: {
                                        Authorization: `Bearer ${newToken}`
                                    }
                                })
                                    .then(response => {
                                        setGames(response.data.data);
                                        setTaskIds(response.data.data.map((data, index) => index + 1));
                                    })
                                    .catch(error => {
                                        console.error('Error fetching game data with new token:', error);
                                        setError('Failed to fetch game data.');
                                    });
                            }
                        })
                            .catch((err) => {
                                console.log(err);
                                navigate("/");
                            });
                    } else {
                        console.error('Error fetching game data:', error);
                        setError('Failed to fetch game data.');
                    }
                } else {
                    console.error('Error fetching game data:', error);
                    setError('Failed to fetch game data.');
                }
            });
    };

    const handleResult = async (result, gameId, url) => {
        if (result) {
            try {
                alert(`You Finished Level ${gameId}`);
                navigate(url);
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const navigateToTask = async (taskId) => {
        let gameMode;

        if (taskId === 1) {
            gameMode = "options";
        } else if (taskId === 2) {
            gameMode = "image";
        } else if (taskId === 3) {
            gameMode = "qr";
        } else {
            gameMode = ""; // default or another mode if applicable
        }

        const getGameMode = (id) => {
            let gameMode = '';
            switch (id) {
                case 1:
                    gameMode = "options";
                    break;
                case 2:
                    gameMode = "image";
                    break;
                case 3:
                    gameMode = "qr";
                    break;
                default:
                    break;
            }
            return gameMode;
        };

        if (taskIds.indexOf(taskId) === -1) {
            navigate("/levels");
        }

        if (taskIds.indexOf(taskId) === 0) {
            const url = `/game-list?taskId=${taskId}&game_mode=${gameMode}`; // Pass game_mode as a parameter
            navigate(url);
        } else {
            const allow = await levelStatusChecker(taskIds[taskIds.indexOf(taskId) - 1], getGameMode(taskIds[taskIds.indexOf(taskId) - 1]));
            if (allow) {
                const url = `/game-list?taskId=${taskId}&game_mode=${gameMode}`;
                handleResult(allow, taskIds[taskIds.indexOf(taskId) - 1], url);
            } else {
                alert(`complete all levels from level(${taskIds[taskIds.indexOf(taskId) - 1]}) and unlock level(${taskId})`);
            }
        }
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
                            {games.length > 0 ? (
                                <div className="levels-page mt-5">
                                    {error && <div className="error-message" style={{ color: 'white' }}>{error}</div>}
                                    <div className="container oval-container mt-5">
                                        {games.map((game, index) => (
                                            <div key={index} id={`task-${index + 1}`} className="oval-button mb-3" style={{ backgroundColor: taskColors[index % taskColors.length] }} onClick={() => navigateToTask(index + 1, game.game_mode)}>
                                                <div className="left-side">*</div>
                                                <span style={{ cursor: 'pointer' }}>{game.tittle}</span>
                                                <div className="right-side">
                                                    {game.status === 'C' && <img src={redlocker} alt="Red Lock" style={{ width: '20px', height: '20px', color: 'white' }} />}
                                                    {game.status === 'O' && <img src={unlock} alt="Unlock" style={{ width: '20px', height: '20px', color: 'white' }} />}
                                                    {game.status === '' && <img src={lock} alt="lock" style={{ width: '20px', height: '20px', color: 'white' }} />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <BeatLoader color={taskColors[Math.floor(Math.random() * taskColors.length % taskColors.length)]} cssOverride={{ margin: '0 auto', position: 'relative', top: '50%' }} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Result Modal"
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '8px',
                        color: 'black',
                        textAlign: 'center',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <h2>{modalContent.message}</h2>
                {modalContent.imageUrl && <img src={Tenor} alt="Result" style={{ maxWidth: '350px', height: 'inherit' }} />}
                {modalContent.linkUrl && <Link to={modalContent.linkUrl} style={{ marginTop: '20px', fontSize: '18px' }}>Go to Game List</Link>}
                <button onClick={() => setShowModal(false)} style={{ marginTop: '20px' }}>Close</button>
            </Modal>
            <Footer />
        </>
    );
}

export default LevelListPage;
