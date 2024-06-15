import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

const ScannerListing = () => {
    const [qrResult, setQrResult] = useState('');

    const handleScan = data => {
        if (data) {
            setQrResult(data);
        }
    };

    const handleError = err => {
        console.error(err);
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
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                            <li className="list-group-item">Dummy</li>
                                        </ul>
                                        <h1 className="scan-header">SCAN ME</h1>
                                        <QrReader
                                            delay={500}
                                            onError={handleError}
                                            onScan={handleScan}
                                            style={{ width: '100%' }}
                                        />
                                        <p>{qrResult}</p>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ position: 'absolute', bottom: '0', width: '100%' }} />
        </>
    );
};

export default ScannerListing;
