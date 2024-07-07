import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import { Modal } from 'react-bootstrap';

function StudentDetailPage() {
    const { id } = useParams();
    const [studentData, setStudentData] = useState([]);
    const [gameMode, setGameMode] = useState('options');
    const token = sessionStorage.getItem('accessToken');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');

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
            setStudentData(response.data.data);
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchStudentDetails(gameMode);
        }
    }, [id, gameMode, token]);
    const handleCheckboxChange = async (item, isChecked) => {
        const status = isChecked ? 'C' : 'F';
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
            setStudentData((prevData) =>
                prevData.map((dataItem) =>
                    dataItem.id === item.id ? { ...dataItem, status: status } : dataItem
                )
            );
        } catch (error) {
            console.error('Error updating game status:', error);
        }
    };
    const handleImageClick = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setIsModalOpen(true);
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-10" style={{ marginBottom: '100px' }}>
                        <h3 className="text-black mt-4 mb-3">Student Detail</h3>
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
                                    {gameMode === 'image' && <th>uploaded Image</th>}
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
                                                            <img
                                                                src={item.answer_value}
                                                                alt="Uploaded file"
                                                                style={{ maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }}
                                                                onClick={() => handleImageClick(item.answer_value)}
                                                            />
                                                        ) : 'No image'}
                                                    </td>
                                                </>
                                            )}
                                            {gameMode !== 'image' && (
                                                <td style={{ color: item.status === 'F' ? 'red' : item.status === 'C' ? 'green' : 'black' }}>
                                                    {item.status === 'C' && (gameMode === 'options' || gameMode === 'qr') ? 'Correct Answer' : (item.status === 'F' ? 'Failed' : item.status)}
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

            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Image Zoom</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedImageUrl} alt="Zoomed file" style={{ width: '100%' }} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default StudentDetailPage;

