import React from 'react';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import { useNavigate } from 'react-router-dom';


function McqListingPage() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/levels');
    }

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                            <div>
                                <form style={{color:'black'}}>
                                    <h3>Question: Can you spot where Service Canada is located in Peterborough?</h3>
                                    <h4> Choose the correct option from the list below!"</h4>
                                    <div className="firstlevel-button" style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="rounded-button" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1ABC9C', borderRadius: '20px', padding: '10px' }}>
                                            <input type="radio" name="options" value="A" style={{ marginRight: '5px' }} />
                                            A
                                        </div>
                                        <div className="span" style={{ marginLeft: '10px' }}>
                                            <span>George street</span>
                                        </div>
                                    </div>
                                    <div className="firstlevel-button" style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="rounded-button" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1ABC9C', borderRadius: '20px', padding: '10px' }}>
                                            <input type="radio" name="options" value="B" style={{ marginRight: '5px' }} />
                                            B
                                        </div>
                                        <div className="span" style={{ marginLeft: '10px' }}>
                                            <span>Water Street</span>
                                        </div>
                                    </div>
                                    <div className="firstlevel-button" style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="rounded-button" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1ABC9C', borderRadius: '20px', padding: '10px' }}>
                                            <input type="radio" name="options" value="C" style={{ marginRight: '5px' }} />
                                            C
                                        </div>
                                        <div className="span" style={{ marginLeft: '10px' }}>
                                            <span>Hunter Street</span>
                                        </div>
                                    </div>
                                    <div className="firstlevel-button" style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="rounded-button" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1ABC9C', borderRadius: '20px', padding: '10px' }}>
                                            <input type="radio" name="options" value="D" style={{ marginRight: '5px' }} />
                                            D
                                        </div>
                                        <div className="span" style={{ marginLeft: '10px' }}>
                                            <span>Aylmer Street</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                        <button onClick={handleSubmit} className="submit-button" style={{ backgroundColor: '#3498db', color: '#fff', borderRadius: '20px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Next</button>
                                    </div>
                                    {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={handleSubmit} className="submit-button" style={{ backgroundColor: '#3498db', color: '#fff', borderRadius: '20px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Check Your Answer</button>
              </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ position: 'absolute', bottom: '0', width: '100%' }} />
        </>
    );
}

export default McqListingPage;
