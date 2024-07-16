import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import frametrophy from '../assests/Frame2.png';
import rectangleImage from '../assests/Rectangle 11.png';

function HomePage() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/levels');
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4" style={{ height: 'auto', width: '100%', overflowY: 'auto', maxWidth: '600px', border: 'none' }}>
                            <div className="text-center mb-4">
                                <img src={rectangleImage} alt="Rectangle" className="img-fluid" style={{ width: '100%', maxWidth: '400px' }} />
                                <div className="position-absolute bottom-0 start-50 translate-middle-x text-white fw-bold">
                                    Sutherland Campus
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button
                                    onClick={handleSubmit}
                                    className="btn btn-primary"
                                    style={{
                                        width: '250px',
                                        borderRadius: '20px',
                                        padding: '10px 10px',
                                        fontWeight: 'bold',
                                        marginLeft: '60px'
                                    }}
                                >
                                    Start
                                </button>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    className="btn btn-light shadow-sm d-flex flex-column align-items-center"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '20px',
                                        backgroundColor: 'white',
                                        padding: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        marginLeft: '75px'
                                    }}
                                >
                                    <img src={frametrophy} alt="Trophy" className="mb-2" style={{ width: '50px', height: '50px', textAlign: 'center' }} />
                                    <span style={{ color: 'black', textAlign: 'center' }}>
                                        <a style={{ color: 'black', textAlign: 'center' }} href="/status">
                                            Status
                                        </a>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HomePage;


