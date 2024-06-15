import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function StudentListPage() {
    const [selectedCampus, setSelectedCampus] = useState('');
    const [students, setStudents] = useState([]);
    const campuses = ['Campus A', 'Campus B', 'Campus C'];
    const token = sessionStorage.getItem('accessToken');

    const handleCampusChange = (event) => {
        setSelectedCampus(event.target.value);
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('https://api-flrming.dhoomaworksbench.site/api/api_student_list', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [token]);

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
