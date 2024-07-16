import React, { useState } from 'react';
import axios from 'axios';
import '../StyleComponent/McqForm.css';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function McqCreationPage() {
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
    });
    const navigate = useNavigate();
    const campusName = sessionStorage.getItem('campusName');
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const token = sessionStorage.getItem('accessToken');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { question, options, correctAnswer } = formData;

        const dataToSend = {
            tittle: question,
            level: 0,
            description: 'string',
            status: true,
            mode: 'options',
            collage_name: campusName,
            game_type: 1,
            options: options.filter(option => option !== ''),
            answer_value: correctAnswer
        };
        try {
            const response = await axios.post('https://api-flrming.dhoomaworksbench.site/game', dataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('MCQ created successfully!');
            setFormData({
                question: '',
                options: ['', '', '', ''],
                correctAnswer: ''
            });

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '800px' }}>
                            <div className="container oval-container">
                                <div className='row m-3'>
                                    <div className='col-md-8'>
                                    <h2 className="form-title mb-4">Multiple Choice Questions Form</h2>
                                    </div>
                                    <div className='col-md-4 d-flex justify-content-end'>
                                    <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: "blue" }} />
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="question" style={{ textAlign: 'left' }}>Question: </label>
                                        <input
                                            type="text"
                                            id="question"
                                            name="question"
                                            value={formData.question}
                                            onChange={handleChange}
                                            required
                                            className="form-control ms-2"
                                            placeholder="Enter your question here"
                                            style={{ textAlign: 'left' }} // Align input text to left
                                        />
                                    </div>
                                    <div className="form-group">
                                        {formData.options.map((option, index) => (
                                            <div key={index} className="option-group">
                                                <label htmlFor={`option${index + 1}`} style={{ textAlign: 'left' }}>{`Option ${index + 1}:`}</label>
                                                <input
                                                    type="text"
                                                    id={`option${index + 1}`}
                                                    name={`option${index + 1}`}
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    required
                                                    className="form-control"
                                                    placeholder="Enter option"
                                                    style={{ textAlign: 'left' }} // Align input text to left
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="correctAnswer" style={{ textAlign: 'left' }}>Correct Answer:</label>
                                        <select
                                            id="correctAnswer"
                                            name="correctAnswer"
                                            className="custom-dropdown form-control"
                                            value={formData.correctAnswer}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select correct answer</option>
                                            {formData.options.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-submit">
                                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default McqCreationPage;
