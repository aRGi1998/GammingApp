import React, { useState } from 'react';
import axios from 'axios';
import '../StyleComponent/McqForm.css';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import { useNavigate } from 'react-router-dom';

function McqCreationPage() {
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
    });
    const navigate = useNavigate();

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
<<<<<<< HEAD
            level: 1,
            description: 'string', 
            status: true, 
            mode: 'options', 
=======
            level: 0,
            description: 'string',
            status: true,
            mode: 'options',
>>>>>>> f03ef715c13f49b8a90ff9ac8875a8d225b9b2a4
            collage_name: 'fleming',
            game_type: 1,
            options: options.filter(option => option !== ''),
            answer_value: correctAnswer
        };

        console.log(dataToSend, 'data to send');

        try {
            const response = await axios.post('https://api-flrming.dhoomaworksbench.site/game', dataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);

            // Handle success (e.g., display a success message or redirect)
            if(response.data) {
                navigate(`/admin-home`); // Pass buttonId in state object

            }
            // if (response.data.message === 'Sucessfully created') {
            //     setPopupMessage('MCQ created successfully!');
            //     setShowPopup(true);

            //     // Clear the form
            //     setFormData({
            //         question: '',
            //         options: ['', '', '', ''],
            //         correctAnswer: ''
            //     });
            // }
        } catch (error) {
            console.error('Error:', error);

            // Handle error (e.g., display an error message)
            setPopupMessage('An error occurred while creating the MCQ.');
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage('');
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '800px' }}>
                            <div className="container oval-container">
                                <h2 className="form-title mb-4">Multiple Choice Question Form</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="question" style={{ textAlign: 'left' }} >Question:</label>
                                        <input
                                            type="text"
                                            id="question"
                                            name="question"
                                            value={formData.question}
                                            onChange={handleChange}
                                            required
                                            className="form-control"
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
                                {/* {showPopup && (
                                    <div className="popup">
                                        <div className="popup-content">
                                            <p>{popupMessage}</p>
                                            <button onClick={closePopup} className="btn btn-secondary">Close</button>
                                        </div>
                                    </div>
                                )} */}
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
