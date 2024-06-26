// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom'; // Import useParams hook from react-router-dom
// import Header from '../CommonComponent/Header';
// import Footer from '../CommonComponent/Footer';

// function StudentDetailPage() {
//     const { id } = useParams(); // Get the student_id parameter from the URL
//     const [studentData, setStudentData] = useState([]); // State to store student data
//     const [gameMode, setGameMode] = useState('options'); // State to store selected game mode
//     const token = sessionStorage.getItem('accessToken'); // Get the accessToken from sessionStorage

//     const fetchStudentDetails = async (selectedGameMode) => {
//         try {
//             if (!token) {
//                 throw new Error('Access token not found.');
//             }

//             const response = await axios.get(`https://api-flrming.dhoomaworksbench.site/admin-user-game-list/${id}?game_mode=${selectedGameMode}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             console.log('Student details:', response.data); // Log the response data
//             setStudentData(response.data.data); // Assuming response.data.data is the student data array
//         } catch (error) {
//             console.error('Error fetching student details:', error);
//         }
//     };

//     useEffect(() => {
//         if (id) {
//             fetchStudentDetails(gameMode); // Fetch student details with the default game mode
//         }
//     }, [id, gameMode, token]); // Fetch student details when id, gameMode, or token changes

//     return (
//         <>
//             <Header />
//             <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
//                 <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
//                     <div className="col-md-10" style={{marginBottom:'100px'}} >
//                         <h3 className="text-black mt-4 mb-3">Student Detail {id}</h3>
//                         <label htmlFor="gameModeSelect" className="text-black">Select Game Mode</label>
//                         <div className="custom-select">
//                             <select
//                                 id="gameModeSelect"
//                                 className="form-control"
//                                 value={gameMode}
//                                 onChange={(e) => setGameMode(e.target.value)}
//                             >
//                                 <option value="options">Mcq Question</option>
//                                 <option value="image">File upload</option>
//                                 <option value="qr">QR scanner</option>
//                             </select>
//                         </div>
//                         <table className="table table-bordered table-striped mt-4">
//                             <thead>
//                                 <tr>
//                                     {gameMode === 'options' ? <th>Title</th> : <th>Description</th>}
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {studentData.length > 0 ? (
//                                     studentData.map((item) => (
//                                         <tr key={item.id}>
//                                             {gameMode === 'options' ? <td>{item.tittle}</td> : <td>{item.description}</td>}
//                                             <td style={{ color: item.status === 'F' ? 'red' : 'black' }}>
//                                                 {item.status === 'F' ? 'Failed' : item.status}
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="2">No data available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default StudentDetailPage;


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

    const handleCheckboxChange = async (item, isChecked) => {
        const status = isChecked ? 'C' : 'F'; // 'C' for correct, 'F' for incorrect
        try {
            const payload = {
                game_id: item.id,
                notes: 0,
                answer_value: item.answer_value,
                status: status
            };

            const response = await axios.post('https://api-flrming.dhoomaworksbench.site/user-game-update', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Update response:', response.data); // Log the response data

            // Update the local state with the new status
            setStudentData((prevData) =>
                prevData.map((dataItem) =>
                    dataItem.id === item.id ? { ...dataItem, status: status } : dataItem
                )
            );
        } catch (error) {
            console.error('Error updating game status:', error);
        }
    };

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
                                    <th>{gameMode === 'options' ? 'Title' : 'Description'}</th>
                                    {gameMode === 'image' && <th>Answer</th>}
                                    {gameMode === 'image' && <th>Correct</th>}
                                    {gameMode !== 'image' && <th>Status</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.length > 0 ? (
                                    studentData.map((item) => (
                                        <tr key={item.id}>
                                            <td>{gameMode === 'options' ? item.tittle : item.description}</td>
                                            {gameMode === 'image' && (
                                                <>
                                                    <td>
                                                        {item.answer_value ? (
                                                            <img src={item.answer_value} alt="Uploaded file" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                                        ) : 'No image'}
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={item.status === 'C'}
                                                            onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                                                        />
                                                    </td>
                                                </>
                                            )}
                                            {gameMode !== 'image' && (
                                                <td style={{ color: item.status === 'F' ? 'red' : 'black' }}>
                                                    {item.status === 'F' ? 'Failed' : item.status}
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={gameMode === 'image' ? 3 : 2}>No data available</td>
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

