// 



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function StudentListPage() {
    const [selectedCampus, setSelectedCampus] = useState('Sutherland'); // Set default campus to Sutherland
    const [students, setStudents] = useState([]);
    const campuses = ['Sutherland', 'Lindsay', 'Haliburton'];
    const token = sessionStorage.getItem('accessToken');

    const handleCampusChange = (event) => {
        setSelectedCampus(event.target.value);
    };

    useEffect(() => {
        const fetchStudents = async () => {
            if (selectedCampus) {
                try {
                    const response = await axios.get(`https://api-flrming.dhoomaworksbench.site/api/student/?campus_name=${selectedCampus}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setStudents(response.data.results); // Use response.data.results to get the students array
                    console.log(response.data, 'data');
                } catch (error) {
                    console.error('Error fetching students:', error);
                }
            }
        };

        fetchStudents();
    }, [selectedCampus, token]); // Call the API on initial render and when selectedCampus changes

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-10 d-flex flex-column align-items-center">
                    <h3 className="text-black">Student List</h3>
                        <div className="form-group mt-4">
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
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Contact Number</th>
                                    <th>Campus</th>
                                    <th>Date Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.username}</td>
                                        <td>{student.email}</td>
                                        <td>{student.contact_number}</td>
                                        <td>{student.collage_name}</td>
                                        <td>{new Date(student.date_joined).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default StudentListPage;
