import React, { useState } from 'react';
import axios from 'axios';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import '../StyleComponent/McqForm.css';

function McqCreationPage() {
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
    });
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
            level: 1,
            description: 'string', 
            status: true, 
            mode: 'options', 
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
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., display an error message)
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ position: 'absolute', bottom: '0', width: '100%' }} />
        </>
    );
}
export default McqCreationPage;
