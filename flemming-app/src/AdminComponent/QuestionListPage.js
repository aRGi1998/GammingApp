import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function QuestionListPage() {
    const [gameMode, setGameMode] = useState('Mcq Question');
    const [college, setCollege] = useState('fleming');
    const [data, setData] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editQuestion, setEditQuestion] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editOptions, setEditOptions] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        const backendValue = getBackendValue(gameMode);
        const apiUrl = `https://api-flrming.dhoomaworksbench.site/api/game/?campus_name=${college}&game_mode=${backendValue}`;
        axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setData(response.data.results || []);
            console.log(response.data.results, 'rs');
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        });
    }, [gameMode, college]);

    const getBackendValue = (mode) => {
        switch (mode) {
            case 'Mcq Question':
                return 'options';
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
        const item = data[index];
        setEditQuestion(item.tittle);
        setEditDescription(item.description);
        if (gameMode === 'Mcq Question') {
            setEditOptions(item.game_options.map(option => option.tittle));
        }
    };

    const handleSave = () => {
        const updatedData = [...data];
        const updatedItem = { ...updatedData[editIndex], tittle: editQuestion, description: editDescription };
        if (gameMode === 'Mcq Question') {
            updatedItem.game_options = editOptions.map(option => ({ tittle: option, description: option }));
        }

        const token = sessionStorage.getItem('accessToken');
        const apiUrl = `https://api-flrming.dhoomaworksbench.site/api/game/${updatedItem.id}/`;

        axios.put(apiUrl, updatedItem, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            updatedData[editIndex] = response.data;
            setData(updatedData);
            setEditIndex(-1);
            setEditQuestion('');
            setEditDescription('');
            setEditOptions([]);
        })
        .catch(error => {
            console.error('There was an error updating the data!', error);
        });
    };

    const handleDelete = (index) => {
        const itemToDelete = data[index];
        const token = sessionStorage.getItem('accessToken');
        const apiUrl = `https://api-flrming.dhoomaworksbench.site/api/game/${itemToDelete.id}/`;

        axios.delete(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            const updatedData = data.filter((_, i) => i !== index);
            setData(updatedData);
        })
        .catch(error => {
            console.error('There was an error deleting the data!', error);
        });
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                            <div className="form-row mb-4">
                                <div className="form-group col-md-6">
                                    <label htmlFor="collegeSelect">Select College</label>
                                    <select
                                        id="collegeSelect"
                                        className="form-control"
                                        value={college}
                                        onChange={(e) => setCollege(e.target.value)}
                                    >
                                        <option value="fleming">Sutherland</option>
                                        <option value="Lindsay">Lindsay</option>
                                        <option value="Haliburton">Haliburton</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="gameModeSelect">Select Game Mode</label>
                                    <select
                                        id="gameModeSelect"
                                        className="form-control"
                                        value={gameMode}
                                        onChange={(e) => setGameMode(e.target.value)}
                                    >
                                        <option value="Mcq Question">Mcq Question</option>
                                        <option value="File upload">File upload</option>
                                        <option value="QR scanner">QR scanner</option>
                                    </select>
                                </div>
                            </div>
                            {data.length > 0 && (
                                <table className="table table-striped table-light mt-4">
                                    <thead>
                                        <tr>
                                            <th>Question</th>
                                            <th>Description</th>
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
                                                            className="form-control"
                                                            value={editQuestion}
                                                            onChange={(e) => setEditQuestion(e.target.value)}
                                                        />
                                                    ) : (
                                                        item.tittle
                                                    )}
                                                </td>
                                                <td>
                                                    {editIndex === index ? (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={editDescription}
                                                            onChange={(e) => setEditDescription(e.target.value)}
                                                        />
                                                    ) : (
                                                        <ul className="pl-3">
                                                            {gameMode === 'Mcq Question' ? (
                                                                editOptions.map((option, i) => (
                                                                    <li key={i}>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={option}
                                                                            onChange={(e) => {
                                                                                const newOptions = [...editOptions];
                                                                                newOptions[i] = e.target.value;
                                                                                setEditOptions(newOptions);
                                                                            }}
                                                                        />
                                                                    </li>
                                                                ))
                                                            ) : (
                                                                item.description.split('\n').map((line, i) => (
                                                                    <li key={i}>{line}</li>
                                                                ))
                                                            )}
                                                        </ul>
                                                    )}
                                                </td>
                                                <td className="d-flex">
                                                    {editIndex === index ? (
                                                        <button className="btn btn-success btn-sm mr-2" onClick={handleSave}>Save</button>
                                                    ) : (
                                                        <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(index)}>Edit</button>
                                                    )}
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default QuestionListPage;
