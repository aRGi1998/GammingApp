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
                console.log(response.data, 'ppp')
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchScores();
    }, [token]);

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-10 d-flex flex-column align-items-center" style={{ marginBottom: '100px' }}>
                        <h3 className="text-black">Score Board</h3>
                        <table className="table table-striped table-light mt-4">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {scores.map((score, index) => (
                                    <tr key={index}>
                                        <td>{score.name}</td>
                                        <td>{score.status}</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ScoreBoardPage;
