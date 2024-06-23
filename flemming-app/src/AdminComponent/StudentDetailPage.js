import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook from react-router-dom
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function StudentDetailPage() {
    const { id } = useParams(); // Get the student_id parameter from the URL
    const [student, setStudent] = useState(null); // State to store student data
    const token = sessionStorage.getItem('accessToken'); // Get the accessToken from sessionStorage

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                if (!token) {
                    throw new Error('Access token not found.');
                }

                const response = await axios.get(`https://api-flrming.dhoomaworksbench.site/admin-user-game-list/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setStudent(response.data); // Assuming response.data is the student object
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        if (id) {
            fetchStudentDetails();
        }
    }, [id, token]); // Fetch student details when id or token changes

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-10">
                        <h3 className="text-black mt-4 mb-3">Student Detail {id}</h3>
                        {student ? (
                            <table className="table table-bordered table-striped">
                                <tbody>
                                    <tr>
                                        <th>Username</th>
                                        {/* <td>{student.username}</td> */}
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        {/* <td>{student.email}</td> */}
                                    </tr>
                                    <tr>
                                        <th>Contact Number</th>
                                        {/* <td>{student.contact_number}</td> */}
                                    </tr>
                                    <tr>
                                        <th>Date Joined</th>
                                        {/* <td>{new Date(student.date_joined).toLocaleDateString()}</td> */}
                                    </tr>
                                    {/* Add more rows for additional details as needed */}
                                </tbody>
                            </table>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default StudentDetailPage;
