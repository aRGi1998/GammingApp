import React, { useState } from 'react';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';

function FileUploadPage() {
    const [instructions, setInstructions] = useState(['']);

    const handleInstructionChange = (index, event) => {
        const newInstructions = instructions.slice();
        newInstructions[index] = event.target.value;
        setInstructions(newInstructions);
    };

    const addInstruction = () => {
        setInstructions([...instructions, '']);
    };

    const removeInstruction = (index) => {
        const newInstructions = instructions.slice();
        newInstructions.splice(index, 1);
        setInstructions(newInstructions);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Instructions submitted:', instructions);
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '800px' }}>
                            <h5 style={{color:'black'}}>Add Instructions For File Uploading</h5>
                            <form onSubmit={handleSubmit}>
                                {instructions.map((instruction, index) => (
                                    <div className="mb-3" key={index}>
                                        <label htmlFor={`instruction-${index}`} className="form-label">Instruction {index + 1}</label>
                                        <div className="input-group">
                                            <textarea
                                                className="form-control"
                                                id={`instruction-${index}`}
                                                rows="2"
                                                value={instruction}
                                                onChange={(e) => handleInstructionChange(index, e)}
                                                placeholder="Enter instruction here..."
                                            ></textarea>
                                            <button type="button" className="btn btn-danger" onClick={() => removeInstruction(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-success mb-3" onClick={addInstruction}>Add Instruction</button>
                                <div className='d-flex justify-content-center'>
                                    <button style={{ marginLeft: '0px' }} type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ position: 'absolute', bottom: '0', width: '100%' }} />
        </>
    );
}

export default FileUploadPage;
