import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

const ScannerListing = () => {
    const location = useLocation();
    const buttonId = location.state?.buttonId;
    const [qrResult, setQrResult] = useState('');

    const handleScan = data => {
        if (data) {
            setQrResult(data);
        }
    };

    const handleError = err => {
        console.error(err);
    };
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/completed');
    }
    return (
        <>
            <Header />
            {/* QR Code Section Start Here!  */}
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
                            {/* Uncomment and use instructions array to display dynamic instructions
                                {instructions.map((instruction, index) => (
                                    <li key={index} className="list-group-item" style={{color: 'black'}}>
                                        {instruction}
                                    </li>
                                ))} */}
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
                    {buttonId === "TASK 7" && (
                        <>
                            <h1 className="scan-header">SCAN ME</h1>
                            <QrReader
                                delay={500}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%' }}
                            />
                            <p>{qrResult}</p>
                            <p className="scan-header">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </>
                    )}



                </div>
            </div>
            <Footer style={{ position: 'absolute', bottom: '0', width: '100%' }} />
        </>
    );
};

export default ScannerListing;
