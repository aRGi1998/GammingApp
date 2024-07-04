// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../CommonComponent/Header';
// import Footer from '../CommonComponent/Footer';

// function ScoreBoardPage() {
//     const [scores, setScores] = useState([]);
//     const token = sessionStorage.getItem('accessToken');

//     useEffect(() => {
//         const fetchScores = async () => {
//             try {
//                 const response = await axios.get('https://api-flrming.dhoomaworksbench.site/user-score', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setScores(response.data);
//                 console.log(response.data, 'ppp')
//             } catch (error) {
//                 console.error('Error fetching scores:', error);
//             }
//         };

//         fetchScores();
//     }, [token]);

//     const handleResetGame = async () => {}
//     return (
//         <>
//             <Header />
//             <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
//                 <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
//                     <div className="col-md-10 d-flex flex-column align-items-center" style={{ marginBottom: '100px' }}>
                      
//                         <div className='row'>
//                             <div className='col-6'>
//                             <h3 className="text-black"  style={{ marginLeft: '-31px' }}>Score Board</h3>
//                             </div>
//                             <div className='col-6'  style={{ marginLeft: '0px', marginTop: '4px' }}>
//                             <button style={{ height: '53px' }} className="btn btn-danger w-100" onClick={handleResetGame}>ResetGame</button>
//                             </div>
//                         </div>
//                         <table className="table table-striped table-light mt-4">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {/* {scores.map((score, index) => (
//                                     <tr key={index}>
//                                         <td>{score.name}</td>
//                                         <td>{score.status}</td>
//                                     </tr>
//                                 ))} */}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default ScoreBoardPage;



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

    const handleResetGame = async () => {
        try {
            await axios.get('https://api-flrming.dhoomaworksbench.site/game-reset', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Game reset successfully');
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
                        <div className='row'>
                            <div className='col-md-6'>
                                <h3 className="text-black">Score Board</h3>
                            </div>
                            <div className='col-md-6 d-flex justify-content-end'>
                                <button className="btn btn-danger" onClick={handleResetGame}>Reset Game</button>
                            </div>
                        </div>
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
