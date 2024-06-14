import React from 'react';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import { useNavigate } from 'react-router-dom';

function StatusPage() {
    const navigate = useNavigate();

    const currentLevel = 4; // Example: You can dynamically get the current level from your data or state

    const handleSubmit = () => {
        navigate('/home');
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                            <div className="text-center">
                                <h2 style={{color:'black'}} className="mb-4">Your Current Level</h2>
                                <p style={{color:'black'}} className="lead mb-4">Nice going! You're now at Level {currentLevel}, Game 3. Keep up the awesome work!</p>
                                <button style={{marginLeft:'0px'}} className="btn btn-primary mt-4" onClick={handleSubmit}>Back to Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ position: 'absolute', bottom: '0', width: '100%' }} />
        </>
    );
}

export default StatusPage;
