import React, { useState } from 'react';
import axios from 'axios';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import { useNavigate } from 'react-router-dom';

function QrCreationPage() {
    const [instructions, setInstructions] = useState(['']);
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const token = sessionStorage.getItem('accessToken');
    const navigate = useNavigate();

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const description = instructions.join('\n');

        const dataToSend = {
            tittle: '',
            description: description,
            status: true,
            mode: 'qr',
            collage_name: 'fleming',
            game_type: 3,
            options: [],
            level: 0,
        };

        console.log('Data to send:', dataToSend);

        try {
            const response = await axios.post('https://api-flrming.dhoomaworksbench.site/game', dataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);
            // Set the QR code URL from the response
            setQrCodeUrl(response.data.qr_code);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleQrDownload = () => {
        if (qrCodeUrl) {
            const link = document.createElement('a');
            link.href = qrCodeUrl;
            link.download = 'qrcode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert('Instruction Created Successfully! & Successfully Downloaded QR');
            // Clear form data
            setInstructions(['']);
            // Hide QR code section
            setQrCodeUrl(null);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card p-4 rounded shadow-lg" style={{ height: 'auto', width: '100%', overflowY: 'auto', maxWidth: '800px' }}>
                            <h5 style={{ color: 'black' }}>Add Instructions For QR Scanning</h5>
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
                                    <button style={{ marginLeft: "0px" }} type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                            {qrCodeUrl && (
                                <div className="mt-4 text-center">
                                    <h5 className="mt-4 text-center" style={{marginRight:'65px'}}>Generated QR Code</h5>
                                    <button className="btn btn-info mt-2 ms-0" onClick={handleQrDownload}>
                                        <i className="fas fa-download"></i> Download QR Code
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default QrCreationPage;
