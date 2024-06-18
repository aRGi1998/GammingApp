import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import QrReaderZ from './QrReaderZ';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'
import axios from 'axios';

const ScannerListing = ({data}) => {
    const [qrResult, setQrResult] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ message: '', imageUrl: '' , linkUrl: '' });

    const handleResult = async (result) => {
        if (result) {
            setQrResult(result);
            try {
                const payload = {
                    "game_id": data.id,
                    "notes": 0,
                    "answer_value": result, // Scanned values add here
                    "status": "C"
                };
                const response = await axios.post('https://api-flrming.dhoomaworksbench.site/user-game-update', payload, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                    }
                });

                if (response.status === 200) {
                    setModalContent({ message: 'Congrats! Scan was successful.' , imageUrl: '' , linkUrl: ''});
                    setShowModal(true);
                }
            } catch (error) {
                console.error('Error posting scan result:', error);
                setModalContent({ message: error.message, imageUrl: '' , linkUrl: ''});
                setShowModal(true);
            }
        }
    };    

    return (
        <>
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                            <div className="levels-page mt-5">
                                <div className="container oval-container mt-5">
                                    <>
                                        <h5 style={{ color: 'black' }}>Instructions List</h5>
                                        <ul style={{ color: 'black' }} className="list-group mb-3">
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                        </ul>
                                        <h1 className="scan-header">SCAN ME</h1>
                                        <QrReaderZ setQrResult={handleResult}/>
                                        <p style={{ position:'relative' , zIndex:'1' , color:'black' , textAlign:'center' , fontWeight:'bolder'}}>the result: {qrResult || 'none'}</p>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Result Modal"
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
                {modalContent.imageUrl && <img src={modalContent.imageUrl} alt="Result" style={{ maxWidth: '100%', height: 'auto' }} />}
                {modalContent.linkUrl && <Link to={modalContent.linkUrl}>Go to the next page</Link>}
            </Modal>            
        </>
    );
};

export default ScannerListing;
