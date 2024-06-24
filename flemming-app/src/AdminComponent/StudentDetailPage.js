import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook from react-router-dom
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function StudentDetailPage() {
    const { id } = useParams(); // Get the student_id parameter from the URL
    const [studentData, setStudentData] = useState([]); // State to store student data
    const [gameMode, setGameMode] = useState('options'); // State to store selected game mode
    const token = sessionStorage.getItem('accessToken'); // Get the accessToken from sessionStorage

    const fetchStudentDetails = async (selectedGameMode) => {
        try {
            if (!token) {
                throw new Error('Access token not found.');
            }

            const response = await axios.get(`https://api-flrming.dhoomaworksbench.site/admin-user-game-list/${id}?game_mode=${selectedGameMode}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Student details:', response.data); // Log the response data
            setStudentData(response.data.data); // Assuming response.data.data is the student data array
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchStudentDetails(gameMode); // Fetch student details with the default game mode
        }
    }, [id, gameMode, token]); // Fetch student details when id, gameMode, or token changes

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-10" style={{marginBottom:'100px'}} >
                        <h3 className="text-black mt-4 mb-3">Student Detail {id}</h3>
                        <label htmlFor="gameModeSelect" className="text-black">Select Game Mode</label>
                        <div className="custom-select">
                            <select
                                id="gameModeSelect"
                                className="form-control"
                                value={gameMode}
                                onChange={(e) => setGameMode(e.target.value)}
                            >
                                <option value="options">Mcq Question</option>
                                <option value="image">File upload</option>
                                <option value="qr">QR scanner</option>
                            </select>
                        </div>
                        <table className="table table-bordered table-striped mt-4">
                            <thead>
                                <tr>
                                    {gameMode === 'options' ? <th>Title</th> : <th>Description</th>}
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.length > 0 ? (
                                    studentData.map((item) => (
                                        <tr key={item.id}>
                                            {gameMode === 'options' ? <td>{item.tittle}</td> : <td>{item.description}</td>}
                                            <td style={{ color: item.status === 'F' ? 'red' : 'black' }}>
                                                {item.status === 'F' ? 'Failed' : item.status}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default StudentDetailPage;

