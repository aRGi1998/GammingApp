import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function StudentListPage() {
    const [students, setStudents] = useState([]);
    const token = sessionStorage.getItem('accessToken');
    const campusName = sessionStorage.getItem('campusName');
    const navigate = useNavigate();

    const fetchStudents = async () => {
        if (campusName) {
            try {
                const response = await axios.get(`https://api-flrming.dhoomaworksbench.site/api/student/?campus_name=${campusName}&active_student=True`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setStudents(response.data.results); // Use response.data.results to get the students array
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [campusName, token]); // Call the API on initial render and when campusName changes

    const handleViewClick = (id) => {
        navigate(`/student-detail/${id}`); // Navigate to the student detail page
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://api-flrming.dhoomaworksbench.site/api/student/${id}/delete/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchStudents(); // Refresh the student list after deletion
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleDeleteCampus = async () => {
        try {
            await axios.get(`https://api-flrming.dhoomaworksbench.site/api/student/delete-all/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setStudents([]); // Clear the student list
        } catch (error) {
            console.error('Error deleting campus:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-12 col-md-10 d-flex flex-column" style={{ marginBottom: '100px' }}>
                        <div className='row m-3'>
                            <div className='col-md-6'>
                                <h3 className="text-black">Student List</h3>
                            </div>
                            <div className='col-md-6 d-flex justify-content-end'>
                                <button className="btn btn-danger" onClick={handleDeleteCampus}>Delete Student List</button>
                            </div>
                        </div>
                        <table className="table table-striped table-light mt-4">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Contact Number</th>
                                    <th>Date Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.username}</td>
                                        <td>{student.email}</td>
                                        <td>{student.contact_number}</td>
                                        <td>{new Date(student.date_joined).toLocaleDateString()}</td>
                                        <td>
                                            <button className="btn btn-primary ms-2" onClick={() => handleViewClick(student.id)}>View</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                                        </td>
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

