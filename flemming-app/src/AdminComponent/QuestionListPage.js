// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../CommonComponent/Header';
// import Footer from '../CommonComponent/Footer';

// function QuestionListPage() {
//     const [gameMode, setGameMode] = useState('');
//     const [college, setCollege] = useState('');

//     useEffect(() => {
//         if (gameMode && college) {
//             const token = sessionStorage.getItem('accessToken');
//             const backendValue = getBackendValue(gameMode);
//             const apiUrl = `https://api-flrming.dhoomaworksbench.site/api/game/?game_mode=${backendValue}&campus_name=${college}`;
//             axios.get(apiUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//             .then(response => {
//                 console.log(response.data.result);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the data!', error);
//             });
//         }
//     }, [gameMode, college]);

//     const getBackendValue = (mode) => {
//         switch (mode) {
//             case 'Mcq Question':
//                 return 'option';
//             case 'File upload':
//                 return 'image';
//             case 'QR scanner':
//                 return 'qr';
//             default:
//                 return '';
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
//                 <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
//                     <div className="col-md-8 d-flex justify-content-center">
//                         <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
//                             <div className="form-group">
//                                 <label htmlFor="gameModeSelect">Select Game Mode</label>
//                                 <select
//                                     id="gameModeSelect"
//                                     className="form-control"
//                                     value={gameMode}
//                                     onChange={(e) => setGameMode(e.target.value)}
//                                 >
//                                     <option value="">Select Game Mode</option>
//                                     <option value="Mcq Question">Mcq Question</option>
//                                     <option value="File upload">File upload</option>
//                                     <option value="QR scanner">QR scanner</option>
//                                 </select>
//                             </div>
//                             <div className="form-group mt-3">
//                                 <label htmlFor="collegeSelect">Select College</label>
//                                 <select
//                                     id="collegeSelect"
//                                     className="form-control"
//                                     value={college}
//                                     onChange={(e) => setCollege(e.target.value)}
//                                 >
//                                     <option value="">Select College</option>
//                                     <option value="Sutherland">Sutherland</option>
//                                     <option value="Lindsay">Lindsay</option>
//                                     <option value="Haliburton">Haliburton</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer style={{ position: 'absolute', bottom: '0', width: '100%' }} />
//         </>
//     );
// }

// export default QuestionListPage;





// with data

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function QuestionListPage() {
    const [gameMode, setGameMode] = useState('');
    const [college, setCollege] = useState('');
    const [data, setData] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editQuestion, setEditQuestion] = useState('');
    const [editAnswer, setEditAnswer] = useState('');

    useEffect(() => {
        if (gameMode && college) {
            const token = sessionStorage.getItem('accessToken');
            const backendValue = getBackendValue(gameMode);
            const apiUrl = `https://api-flrming.dhoomaworksbench.site/api/game/?game_mode=${backendValue}&campus_name=${college}`;
            axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setData(response.data.result || []);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
        }
    }, [gameMode, college]);

    const getBackendValue = (mode) => {
        switch (mode) {
            case 'Mcq Question':
                return 'option';
            case 'File upload':
                return 'image';
            case 'QR scanner':
                return 'qr';
            default:
                return '';
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditQuestion(data[index].question);
        setEditAnswer(data[index].answer);
    };

    const handleSave = () => {
        const updatedData = [...data];
        updatedData[editIndex] = { ...updatedData[editIndex], question: editQuestion, answer: editAnswer };
        setData(updatedData);
        setEditIndex(-1);
        setEditQuestion('');
        setEditAnswer('');
    };

    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                            <div className="form-group">
                                <label htmlFor="gameModeSelect">Select Game Mode</label>
                                <select
                                    id="gameModeSelect"
                                    className="form-control"
                                    value={gameMode}
                                    onChange={(e) => setGameMode(e.target.value)}
                                >
                                    <option value="">Select Game Mode</option>
                                    <option value="Mcq Question">Mcq Question</option>
                                    <option value="File upload">File upload</option>
                                    <option value="QR scanner">QR scanner</option>
                                </select>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="collegeSelect">Select College</label>
                                <select
                                    id="collegeSelect"
                                    className="form-control"
                                    value={college}
                                    onChange={(e) => setCollege(e.target.value)}
                                >
                                    <option value="">Select College</option>
                                    <option value="Sutherland">Sutherland</option>
                                    <option value="Lindsay">Lindsay</option>
                                    <option value="Haliburton">Haliburton</option>
                                </select>
                            </div>
                            <table className="table table-striped table-light mt-4">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Answer</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                {editIndex === index ? (
                                                    <input 
                                                        type="text" 
                                                        value={editQuestion} 
                                                        onChange={(e) => setEditQuestion(e.target.value)} 
                                                    />
                                                ) : (
                                                    item.question
                                                )}
                                            </td>
                                            <td>
                                                {editIndex === index ? (
                                                    <input 
                                                        type="text" 
                                                        value={editAnswer} 
                                                        onChange={(e) => setEditAnswer(e.target.value)} 
                                                    />
                                                ) : (
                                                    item.answer
                                                )}
                                            </td>
                                            <td>
                                                {editIndex === index ? (
                                                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                                                ) : (
                                                    <button className="btn btn-primary" onClick={() => handleEdit(index)}>Edit</button>
                                                )}
                                                <button className="btn btn-danger ml-2" onClick={() => handleDelete(index)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ position: 'absolute', bottom: '0', width: '100%' }} />
        </>
    );
}

export default QuestionListPage;
