
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import lock from '../assests/lock.png';
import unlock from '../assests/unlock.png.png'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { gameStatusChecker } from '../utils/StatusChecker'
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

const GameListPage = () => {

    const [gameData, setGameData] = useState([]);
    const [gameIds , storeGameIds] = useState([])
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getGameList();
    }, []);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('taskId');
    console.log(taskId)

    const getGameList = () => {
        const token = sessionStorage.getItem('accessToken');
        let url = ''
        if ( taskId == 1) {            
             url = `https://api-flrming.dhoomaworksbench.site/user-game-list/${taskId}?game_mode=options&campus_name=fleming`;
        } else if ( taskId == 2) {
            url = `https://api-flrming.dhoomaworksbench.site/user-game-list/${taskId}?game_mode=image&campus_name=fleming`;
        } else {
            url = `https://api-flrming.dhoomaworksbench.site/user-game-list/${taskId}?game_mode=qr&campus_name=fleming`;
        }
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setGameData(response.data.data);
                console.log(response.data.data, 'response -')
                storeGameIds(response.data.data.map((game,index) => game.id))
            })
            .catch(error => {
                console.error('Error fetching game data:', error);
                setError('Failed to fetch game data.');
            });
    };
    
    const navigateToFirstLevel = async (buttonId) => {
            console.log("btn",buttonId)
            console.log(gameIds.indexOf(buttonId))
            if ( gameIds.indexOf(buttonId) === -1) {
                navigate(`/mcq-list`); // Pass buttonId in state object
            }

            if ( gameIds.indexOf(buttonId) === 0  ) {
                const allow = await gameStatusChecker(gameIds[0])
                if (allow) {
                    navigate(`/mcq-list?id=${buttonId}`);
                } else {
                    navigate(`/mcq-list`);
                    alert("you must contact admin to unlock this level if you found this level as locked")
                }                
            } else {
                const gIndex = gameIds.indexOf(buttonId) - 1
                const allow = await gameStatusChecker(gameIds[gIndex])
                if (allow) {
                    navigate(`/mcq-list?id=${buttonId}`);
                } else {
                    alert("you must complete previous game to unlock this game")
                }
            }

    }
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
            <Header/>
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                            <div className="levels-page mt-5">
                                {error && <div className="error-message" style={{ color: 'white' }}>{error}</div>}
                                <div className="container oval-container mt-5" >
                                    {gameData.map((game, index) => (                                        
                                        <div key={game.id} id={`task-${game.id}`} className="oval-button mb-3" style={{ backgroundColor: taskColors[index % taskColors.length] }} onClick={() => navigateToFirstLevel(game.id)}>
                                            <div className="left-side">*</div>
                                            <span style={{ cursor: 'pointer' }}>Game: {index}</span>
                                            <div className="right-side">
                                                {                                                
                                                    game.status ? (
                                                        <img src={lock} alt="Lock" style={{ width: '20px', height: '20px', color: 'white' }} />
                                                    ): <img src={unlock} alt="" style={{ width: '20px', height: '20px', color: 'white' }} />
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default GameListPage;


