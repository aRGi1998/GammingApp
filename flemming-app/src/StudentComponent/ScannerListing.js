import React, { useState } from 'react';
import QrReaderZ from './QrReaderZ';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import Footer from '../CommonComponent/Footer';
import Header from '../CommonComponent/Header';

const ScannerListing = ({ data }) => {
    const [qrResult, setQrResult] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ message: '', linkUrl: '/game-list?taskId=3' });
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    // Function to capitalize the first letter of each word and make the remaining letters lowercase
    const toCapitalCase = (str) => {
        return str.replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    };

    let descriptions = '' || [];
    if (data.description.includes("\n")) {
        descriptions = data?.description.split('\n').map(line => toCapitalCase(line));
    } else {
        descriptions = toCapitalCase(data.description);
    }

    const handleResult = async (result) => {
        if (result) {
            setQrResult(result);
            try {
                const payload = {
                    game_id: data.id,
                    notes: 0,
                    answer_value: result,
                    status: ""
                };
                const response = await axios.post('https://api-flrming.dhoomaworksbench.site/user-game-update', payload, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                    }
                });

                if (response.status === 200) {
                    setModalContent({ message: 'Successfully Scanned!', linkUrl: '/game-list?taskId=3' });
                    setShowModal(true);
                }
            } catch (error) {
                console.error('Error posting scan result:', data.id);
                setModalContent({ message: 'Please Scan a valid QR Code!', linkUrl: `/mcq-list?id=${data.id}` });
                setShowModal(true);
            }
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                            <div className="levels-page mt-5">
                                <div className="container oval-container mt-5">
                                    <>
                                        <h5 style={{ color: 'black' }}>Instructions List</h5>
                                        <ul style={{ color: 'black' }} className="list-group mb-3">
                                            {
                                                typeof descriptions === 'string' ? (
                                                    <li className="list-group-item">{descriptions}</li>
                                                ) : (
                                                    descriptions.map((describe, index) => (
                                                        <li key={index} className="list-group-item">{describe}</li>
                                                    ))
                                                )
                                            }
                                        </ul>
                                        <h1 className="scan-header">SCAN ME</h1>
                                        <QrReaderZ setQrResult={handleResult} />
                                        <p style={{ position: 'relative', zIndex: '1', color: 'black', textAlign: 'center', fontWeight: 'bolder' }}>the result: {qrResult || 'none'}</p>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Modal
                isOpen={showModal}
                onRequestClose={() => { setShowModal(false); navigate("/game-list?taskId=3") }}
                contentLabel="Result Modal"
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        color: 'black',
                        textAlign: 'center',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <h2>{modalContent.message}</h2>
                <button className="btn btn-primary mt-1" onClick={() => { setShowModal(false); navigate(modalContent.linkUrl) }}>Back</button>
            </Modal>
        </>
    );
};

export default ScannerListing;
