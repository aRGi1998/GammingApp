import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import QrReaderZ from './QrReaderZ';

const ScannerListing = ({data}) => {
    const [qrResult, setQrResult] = useState('');
    console.log("data",data)

    // const handleResult = (result,error) => {
    //     if(!!result) {
    //         console.log("result",result)
    //     }

    //     if (!!error) {
    //         console.log("error", error)
    //     }
    // }

    // const handleError = err => {
    //     console.error(err);
    // };

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
                                        <QrReaderZ setQrResult={setQrResult}/>
                                        <p style={{ position:'relative' , zIndex:'1' , color:'black' , textAlign:'center' , fontWeight:'bolder'}}>the result: {qrResult || 'none'}</p>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScannerListing;
