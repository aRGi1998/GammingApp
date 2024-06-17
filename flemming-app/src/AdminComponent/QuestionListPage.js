import React, { useState } from 'react';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function QuestionListPage() {
    const [questions, setQuestions] = useState([
        { id: 1, question: 'What is the age of India?' },
        { id: 2, question: 'What is the capital of France?' },
        { id: 3, question: 'Who wrote "To Kill a Mockingbird"?' },
    ]);

    const [isEditing, setIsEditing] = useState(null);
    const [editText, setEditText] = useState('');

    const handleEditClick = (id, currentQuestion) => {
        setIsEditing(id);
        setEditText(currentQuestion);
    };

    const handleSaveClick = (id) => {
        setQuestions(questions.map(question => 
            question.id === id ? { ...question, question: editText } : question
        ));
        setIsEditing(null);
        setEditText('');
    };

    const handleDeleteClick = (id) => {
        setQuestions(questions.filter(question => question.id !== id));
    };

    return (
        <>
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex flex-column align-items-center">
                        <div className="card text-white p-4 rounded shadow-lg mt-4" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '800px' }}>
                            <table className="table table-striped table-light">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questions.map(({ id, question }) => (
                                        <tr key={id}>
                                            <td>
                                                {isEditing === id ? (
                                                    <input 
                                                        type="text" 
                                                        value={editText} 
                                                        onChange={(e) => setEditText(e.target.value)} 
                                                    />
                                                ) : (
                                                    question
                                                )}
                                            </td>
                                            <td>
                                                {isEditing === id ? (
                                                    <button 
                                                        className="btn btn-success" 
                                                        onClick={() => handleSaveClick(id)}
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button 
                                                        className="btn btn-primary" 
                                                        onClick={() => handleEditClick(id, question)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                <button 
                                                    className="btn btn-danger ml-2" 
                                                    onClick={() => handleDeleteClick(id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuestionListPage;
