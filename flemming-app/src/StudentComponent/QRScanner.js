import React, { useState } from 'react';
import QrReader from 'react-qr-reader';


const QRScanner = () => {
    const [result, setResult] = useState('');

    const handleScan = (data) => {
        if (data) {
            setResult(data);
        }
    };

    const handleError = (error) => {

        console.error(error);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>SCAN ME</h1>
            <div style={{ border: '2px solid black', margin: 'auto', width: 'fit-content' }}>
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' , border:'1px solid black' }}
                />
            </div>
            <p>{result}</p>
        </div>
    );
};

export default QRScanner;
