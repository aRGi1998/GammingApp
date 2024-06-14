import React, { useState } from 'react';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function StudentListPage() {
    const [selectedCampus, setSelectedCampus] = useState('');
    const campuses = ['Campus A', 'Campus B', 'Campus C'];
    const students = [
        { name: 'John Doe', image: 'image1.jpg', time: '10:00 AM', status: 'Active', level: 'Level 1' },
        { name: 'Jane Smith', image: 'image2.jpg', time: '10:30 AM', status: 'Inactive', level: 'Level 2' },
        { name: 'Sam Johnson', image: 'image3.jpg', time: '11:00 AM', status: 'Active', level: 'Level 3' },
        { name: 'John Doe', image: 'image1.jpg', time: '10:00 AM', status: 'Active', level: 'Level 1' },
        { name: 'Jane Smith', image: 'image2.jpg', time: '10:30 AM', status: 'Inactive', level: 'Level 2' },
        { name: 'Sam Johnson', image: 'image3.jpg', time: '11:00 AM', status: 'Active', level: 'Level 3' },
        { name: 'John Doe', image: 'image1.jpg', time: '10:00 AM', status: 'Active', level: 'Level 1' },
        { name: 'Jane Smith', image: 'image2.jpg', time: '10:30 AM', status: 'Inactive', level: 'Level 2' },
        { name: 'Sam Johnson', image: 'image3.jpg', time: '11:00 AM', status: 'Active', level: 'Level 3' },
        { name: 'John Doe', image: 'image1.jpg', time: '10:00 AM', status: 'Active', level: 'Level 1' },
        { name: 'Jane Smith', image: 'image2.jpg', time: '10:30 AM', status: 'Inactive', level: 'Level 2' },
        { name: 'Sam Johnson', image: 'image3.jpg', time: '11:00 AM', status: 'Active', level: 'Level 3' },
        // Add more dummy data as needed
    ];

    const handleCampusChange = (event) => {
        setSelectedCampus(event.target.value);
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex flex-column align-items-center">
                        <div className="card text-white p-4 rounded shadow-lg mt-4" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '800px' }}>
                            <div className="form-group">
                                <label htmlFor="campusSelect" className="text-white">Select Campus:</label>
                                <select id="campusSelect" className="form-control" value={selectedCampus} onChange={handleCampusChange}>
                                    <option value="" disabled>Select a campus</option>
                                    {campuses.map((campus, index) => (
                                        <option key={index} value={campus}>{campus}</option>
                                    ))}
                                </select>
                            </div>
                            <table className="table table-striped table-light">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={index}>
                                            <td>{student.name}</td>
                                            <td><img src={student.image} alt={student.name} style={{ width: '50px', height: '50px' }} /></td>
                                            <td>{student.time}</td>
                                            <td>{student.status}</td>
                                            <td>{student.level}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ position: 'absolute', bottom: '0', width: '100%' }} />
        </>
    );
}

export default StudentListPage;
