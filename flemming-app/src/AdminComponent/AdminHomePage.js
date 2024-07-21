import React from 'react';
import { useNavigate } from 'react-router-dom';
import lock from '../assests/lock.png';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function AdminHomePage() {
    const navigate = useNavigate();
    const navigateToMcq = () => {
        navigate('/mcq-creation');
    };

    const navigateToFileUpload = () => {
        navigate('/fu-creation');
    };

    const navigateToQRScanner = () => {
        navigate('/qr-creation');
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                        <h2 className="form-title m-0">Question Composer</h2>
                            <div className="m-2 p-5 level">
                                <div id="MCQ" className="btn oval-button mt-4 mb-3" style={{ backgroundColor: 'rgb(19, 223, 91)', cursor: "pointer", width: '100%', height: '30%', borderRadius: '10px' }} onClick={() => navigateToMcq('MCQ')}>
                                    <span style={{ color: 'white' }} >Multiple Choice Questions</span>
                                    <img className="ms-1" src={lock} alt="Lock" style={{ width: '20px', height: '20px', color: 'white' }} />
                                </div>
                                <div id="FU" className="btn oval-button mb-3" style={{ backgroundColor: 'rgb(19, 223, 148)', cursor: "pointer", width: '100%', height: '30%', borderRadius: '10px' }} onClick={() => navigateToFileUpload('FU')}>
                                    <span style={{ color: 'white' }} >Image Uploads</span>
                                    <img className="ms-1" src={lock} alt="Lock" style={{ width: '20px', height: '20px', color: 'white' }} />
                                </div>
                                <div id="QRS" className="btn oval-button mb-3" style={{ backgroundColor: 'rgb(11, 156, 103)', cursor: "pointer", width: '100%', height: '30%', borderRadius: '10px' }} onClick={() => navigateToQRScanner('QRS')}>
                                    <span style={{ color: 'white' }} >QR Scanner</span>
                                    <img className="ms-1" src={lock} alt="Lock" style={{ width: '20px', height: '20px', color: 'white' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AdminHomePage;
