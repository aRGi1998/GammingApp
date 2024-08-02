import React, { useState } from 'react';
import axios from 'axios';
import '../StyleComponent/McqForm.css';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

function McqCreationPage() {
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
    });
    const navigate = useNavigate();
    const campusName = sessionStorage.getItem('campusName');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
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
            await axios.post('https://api-flrming.dhoomaworksbench.site/game', dataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setModalMessage('MCQ created successfully!');
            setShowModal(true);
            setFormData({
                question: '',
                options: ['', '', '', ''],
                correctAnswer: ''
            });

        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 400) {
                setModalMessage(error.response.data.message || 'Error creating MCQ. Please try again.');
            } else {
                setModalMessage('Error creating MCQ. Please try again.');
            }
            setShowModal(true);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient">
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8  d-flex justify-content-center">
                        <div className="card text-dark bg-light p-4 rounded shadow-lg m-3" style={{ width: '100%', overflowY: 'auto', maxWidth: '800px' }}>
                            <div className="container oval-container">
                                <div className='row mb-3'>
                                    <div className='col-md-4 d-flex justify-content-start'>
                                        <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: "blue" }} />
                                    </div>
                                    <div className='col-md-8 d-flex justify-content-start align-items-start'>
                                        <h2 className="form-title mb-4">Multiple Choice Questions Form</h2>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col-md-3 d-flex align-items-center">
                                            <label htmlFor="question" className="form-label">Question:</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                id="question"
                                                name="question"
                                                value={formData.question}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                                placeholder="Enter Your Question Here"
                                                style={{ height: '100%' }}
                                            />
                                        </div>
                                    </div>
                                    {formData.options.map((option, index) => (
                                        <div className="row mb-3" key={index}>
                                            <div className="col-md-3 d-flex align-items-center">
                                                <label htmlFor={`option${index + 1}`} className="form-label">{`Option ${index + 1}:`}</label>
                                            </div>
                                            <div className="col-md-9">
                                                <input
                                                    type="text"
                                                    id={`option${index + 1}`}
                                                    name={`option${index + 1}`}
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    required
                                                    className="form-control"
                                                    placeholder={`Enter Option ${index + 1}`}
                                                    style={{ height: '100%' }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="row mb-3">
                                        <div className="col-md-3 d-flex align-items-center">
                                            <label htmlFor="correctAnswer" className="form-label">Correct Answer:</label>
                                        </div>
                                        <div className="col-md-9">
                                            <select
                                                id="correctAnswer"
                                                name="correctAnswer"
                                                className="form-control"
                                                value={formData.correctAnswer}
                                                onChange={handleChange}
                                                required
                                                style={{ height: '100%' }}
                                            >
                                                <option value="">Select Correct Answer</option>
                                                {formData.options.map((option, index) => (
                                                    <option key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12 text-center">
                                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Result Modal"
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        color: 'black',
                        textAlign: 'center',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <h2>{modalMessage}</h2>
                <button className="btn btn-primary mt-1" onClick={() => setShowModal(false)}>Close</button>
            </Modal>
        </>
    );
}

export default McqCreationPage;

