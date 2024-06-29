import React, { useState, useEffect } from 'react';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function ScoreBoardPage() {
    const [selectedCampus, setSelectedCampus] =useState(['Sutherland']) // Set default campus to Sutherland
    const campuses = ['Sutherland', 'Lindsay', 'Haliburton', 'fleming'];
    const handleCampusChange = (event) => {
        setSelectedCampus(event.target.value);
    };
    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-10 d-flex flex-column align-items-center" style={{ marginBottom: '100px' }}>
                        <h3 className="text-black">Score Board</h3>
                        <div className="form-group mt-4 custom-select">
                            <label htmlFor="campusSelect" className="text-black">Select Campus:</label>
                            <select id="campusSelect" className="form-control" value={selectedCampus} onChange={handleCampusChange}>
                                <option value="" disabled>Select a campus</option>
                                {campuses.map((campus, index) => (
                                    <option key={index} value={campus}>{campus}</option>
                                ))}
                            </select>
                        </div>
                        <table className="table table-striped table-light mt-4">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ScoreBoardPage;
 
