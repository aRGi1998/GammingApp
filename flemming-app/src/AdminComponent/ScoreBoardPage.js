import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function ScoreBoardPage() {
    const [scores, setScores] = useState([]);
    const token = sessionStorage.getItem('accessToken');

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get('https://api-flrming.dhoomaworksbench.site/user-score', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setScores(response.data);
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchScores();
    }, [token]);

    const handleResetGame = async () => {
        try {
            await axios.get('https://api-flrming.dhoomaworksbench.site/game-reset', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Optionally, fetch updated scores or update local state after reset
        } catch (error) {
            console.error('Error resetting game:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center mt-4" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-10 d-flex flex-column ">
                        <div className='row m-3'>
                            <div className='col-md-6'>
                                <h3 className="text-black">Score Board</h3>
                            </div>
                            <div className='col-md-6 d-flex justify-content-end'>
                                <button className="btn btn-danger" onClick={handleResetGame}>Reset Game</button>
                            </div>
                        </div>
                        {scores.length > 0 ? (
                            <table className="table table-striped table-light mt-4">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact No:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores.map((score) => (
                                        <tr key={score.username}>
                                            <td>{score.username}</td>
                                            <td>{score.email}</td>
                                            <td>{score.contact_number}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="alert alert-info mt-4">
                                Currently no data available.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ScoreBoardPage;
