import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function QuestionListPage() {
    const [gameMode, setGameMode] = useState('options');
    const [responseData, setResponseData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedItem, setUpdatedItem] = useState(null);
    const college = sessionStorage.getItem('campusName'); // Get the college name from session storage

    useEffect(() => {
        fetchData();
    }, [gameMode, college]);

    const fetchData = () => {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            console.error('Access token not found in session storage');
            return;
        }

        axios.get(`https://api-flrming.dhoomaworksbench.site/api/game/?game_mode=${gameMode}&campus_name=${college}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setResponseData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleEdit = (item) => {
        setUpdatedItem(item);
        setEditMode(true);
    };

    const handleSave = () => {
        const token = sessionStorage.getItem('accessToken');
        const apiUrl = `https://api-flrming.dhoomaworksbench.site/api/game/${updatedItem.id}/`;

        // Create a copy of updatedItem and remove qr_code if gameMode is 'qr'
        const updatedData = { ...updatedItem };
        if (gameMode === 'qr') {
            delete updatedData.qr_code;
        }

        axios.put(apiUrl, updatedData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const newResults = responseData.results.map(result => result.id === updatedItem.id ? response.data : result);
                setResponseData({ ...responseData, results: newResults });
                setEditMode(false);
                setUpdatedItem(null);
            })
            .catch(error => {
                console.error('There was an error updating the data!', error);
            });
    };

    const handleDelete = (item) => {
        const token = sessionStorage.getItem('accessToken');
        const apiUrl = `https://api-flrming.dhoomaworksbench.site/api/game/${item.id}/`;

        axios.delete(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                const updatedData = responseData.results.filter(result => result.id !== item.id);
                setResponseData({ ...responseData, results: updatedData });
            })
            .catch(error => {
                console.error('There was an error deleting the data!', error);
            });
    };

    const handleDownload = (item) => {
        const link = document.createElement('a');
        link.href = item.qr_code;
        link.download = 'qr_code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert('Download started for ' + item.description);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-10 d-flex flex-column" style={{ marginBottom: '100px' }}>
                        <div className='row m-3'>
                            <div className='col-md-6'>
                                <h3 className="text-black">Question Lists</h3>
                            </div>
                            <div className='col-md-6 d-flex justify-content-end'>
                                <div className="custom-select">
                                    <select
                                        id="gameModeSelect"
                                        className="form-control"
                                        value={gameMode}
                                        onChange={(e) => setGameMode(e.target.value)}
                                    >
                                        <option value="options">Mcq Questions</option>
                                        <option value="image">Image uploads</option>
                                        <option value="qr">QR scanner</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped mt-3">
                                <thead>
                                    <tr>
                                        {gameMode === 'options' && <th>Title</th>}
                                        {gameMode !== 'options' && <th>Description</th>}
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {responseData && responseData.results.map(item => (
                                        <tr key={item.id} style={{ height: '50px' }}>
                                            {gameMode === 'options' && (
                                                <>
                                                    <td>
                                                        {editMode && updatedItem.id === item.id ? (
                                                            <input
                                                                type="text"
                                                                value={capitalizeFirstLetter(updatedItem.tittle)}
                                                                onChange={(e) => setUpdatedItem({ ...updatedItem, tittle: capitalizeFirstLetter(e.target.value) })}
                                                                className="form-control"
                                                            />
                                                        ) : (
                                                            <span>{capitalizeFirstLetter(item.tittle)}</span>
                                                        )}
                                                    </td>
                                                </>
                                            )}
                                            {gameMode !== 'options' && (
                                                <td>
                                                    {editMode && updatedItem.id === item.id ? (
                                                        <input
                                                            type="text"
                                                            value={capitalizeFirstLetter(updatedItem.description)}
                                                            onChange={(e) => setUpdatedItem({ ...updatedItem, description: capitalizeFirstLetter(e.target.value) })}
                                                            className="form-control"
                                                        />
                                                    ) : (
                                                        <span>{capitalizeFirstLetter(item.description)}</span>
                                                    )}
                                                </td>
                                            )}
                                            <td>
                                                {editMode && updatedItem.id === item.id ? (
                                                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                                                ) : (
                                                    <>
                                                        {gameMode === 'qr' ? (
                                                            <button className="btn btn-secondary ms-2" onClick={() => handleDownload(item)}>Download</button>
                                                        ) : (
                                                            <button className="btn btn-primary ms-2" onClick={() => handleEdit(item)}>Edit</button>
                                                        )}
                                                    </>
                                                )}
                                                <button className="btn btn-danger" onClick={() => handleDelete(item)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default QuestionListPage;

