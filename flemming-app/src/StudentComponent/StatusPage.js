// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../CommonComponent/Header';
// import Footer from '../CommonComponent/Footer';

// function StatusPage() {
//     const [gameStatus, setGameStatus] = useState({});
//     const navigate = useNavigate();
//     const token = sessionStorage.getItem('accessToken');

//     useEffect(() => {
//         const fetchGameStatus = async () => {
//             try {
//                 const response = await axios.get('https://api-flrming.dhoomaworksbench.site/current-level', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 if (response.data.data === '') {
//                     console.log('no data');
//                 }
//                 setGameStatus(response.data.data);
//                 console.log(response.data, 'data');
//             } catch (error) {
//                 console.error('Error fetching game status:', error);
//             }
//         };

//         fetchGameStatus();
//     }, [token]);

//     const handleSubmit = () => {
//         navigate('/home');
//     };

//     return (
//         <>
//             <Header />
//             <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
//                 <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
//                     <div className="col-md-8 d-flex justify-content-center">
//                         <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
//                             <div className="text-center">
//                                 <h2 style={{ color: 'black' }} className="mb-4">Your Current Level</h2>
//                                 <p style={{ color: 'black' }} className="lead mb-4">
//                                     Nice going! You're now at {gameStatus.game_type}, Game Level {gameStatus.game_level}. Keep up the awesome work!
//                                 </p>
//                                 <button style={{ marginLeft: '0px' }} className="btn btn-primary mt-4" onClick={handleSubmit}>Back to Home</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default StatusPage;



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
                const response = await axios.get('https://api-flrming.dhoomaworksbench.site/current-level', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.data === '') {
                    console.log('no data');
                }
                setGameStatus(response.data.data);
                console.log(response.data, 'data');
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
                                {Object.keys(gameStatus).length === 0 ? (
                                    <>
                                        <h2 style={{ color: 'black' }} className="mb-4">Start Your Game</h2>
                                        <p style={{ color: 'black' }} className="lead mb-4">
                                            Ready to embark on your journey? Click the button below to start your game!
                                        </p>
                                        <button style={{ marginLeft: '55px' }} className="btn btn-primary mt-4" onClick={() => navigate('/levels')}>Play Game</button>
                                    </>
                                ) : (
                                    <>
                                        <h2 style={{ color: 'black' }} className="mb-4">Your Current Level</h2>
                                        <p style={{ color: 'black' }} className="lead mb-4">
                                            Nice going! You're now at {gameStatus.game_type}, Game Level {gameStatus.game_level}. Keep up the awesome work!
                                        </p>
                                        <button style={{ marginLeft: '0px' }} className="btn btn-primary mt-4" onClick={handleSubmit}>Back to Home</button>
                                    </>
                                )}
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

