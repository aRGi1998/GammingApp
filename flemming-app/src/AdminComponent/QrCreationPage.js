// import React, { useState } from 'react';
// import axios from 'axios';
// import Header from '../CommonComponent/Header';
// import Footer from '../CommonComponent/Footer';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// function QrCreationPage() {
//     const [instructions, setInstructions] = useState(['']);
//     const [qrCodeUrl, setQrCodeUrl] = useState(null);
//     const token = sessionStorage.getItem('accessToken');
//     const navigate = useNavigate();
//     const campusName = sessionStorage.getItem('campusName');

//     const handleInstructionChange = (index, event) => {
//         const newInstructions = instructions.slice();
//         newInstructions[index] = event.target.value;
//         setInstructions(newInstructions);
//     };

//     const addInstruction = () => {
//         setInstructions([...instructions, '']);
//     };

//     const removeInstruction = (index) => {
//         const newInstructions = instructions.slice();
//         newInstructions.splice(index, 1);
//         setInstructions(newInstructions);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const description = instructions.join('\n');

//         const dataToSend = {
//             tittle: '',
//             description: description,
//             status: true,
//             mode: 'qr',
//             collage_name: campusName,
//             game_type: 3,
//             options: [],
//             level: 0,
//         };
//         try {
//             const response = await axios.post('https://api-flrming.dhoomaworksbench.site/game', dataToSend, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             // Set the QR code URL from the response
//             const qrCodeUrl = response.data.qr_code;
//             setQrCodeUrl(qrCodeUrl);

//             // Automatically download the QR code
//             if (qrCodeUrl) {
//                 const link = document.createElement('a');
//                 link.href = qrCodeUrl;
//                 link.download = 'qrcode.png';
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
//                 alert('Instruction Created Successfully! & Successfully Downloaded QR');
//                 // Clear form data
//                 setInstructions(['']);
//                 // Hide QR code section
//                 setQrCodeUrl(null);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
//                 <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
//                     <div className="col-md-8 d-flex justify-content-center">
//                         <div className="card p-4 rounded shadow-lg" style={{ height: 'auto', width: '100%', overflowY: 'auto', maxWidth: '800px' }}>
//                             <div className='row m-3'>
//                                 <div className='col-md-8'>
//                                     <h5 style={{ color: 'blue' }}>Add Instructions For QR Scanning</h5>
//                                 </div>
//                                 <div className='col-md-4 d-flex justify-content-end'>
//                                     <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: "blue" }} />
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 {instructions.map((instruction, index) => (
//                                     <div className="mb-3" key={index}>
//                                         <div className="input-group">
//                                             <textarea
//                                                 className="form-control"
//                                                 id={`instruction-${index}`}
//                                                 rows="2"
//                                                 value={instruction}
//                                                 onChange={(e) => handleInstructionChange(index, e)}
//                                                 placeholder="Enter instruction here..."
//                                             ></textarea>
//                                             <button type="button" className="btn btn-danger" onClick={() => removeInstruction(index)}>Remove</button>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 <button type="button" className="btn btn-success mb-3" onClick={addInstruction}>Add Instruction</button>
//                                 <div className='d-flex justify-content-center'>
//                                     <button style={{ marginLeft: "0px" }} type="submit" className="btn btn-primary">Submit</button>
//                                 </div>
//                             </form>
//                             {qrCodeUrl && (
//                                 <div className="mt-4 text-center">
//                                     <h5 className="mt-4 text-center" style={{ marginRight: '65px' }}>Generated QR Code</h5>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default QrCreationPage;

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function QrCreationPage() {
    const [instructions, setInstructions] = useState(['']);
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const token = sessionStorage.getItem('accessToken');
    const navigate = useNavigate();
    const campusName = sessionStorage.getItem('campusName');

    const handleInstructionChange = (index, event) => {
        const newInstructions = [...instructions];
        newInstructions[index] = event.target.value;
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
            collage_name: campusName,
            game_type: 3,
            options: [],
            level: 0,
        };
        try {
            const response = await axios.post('https://api-flrming.dhoomaworksbench.site/game', dataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Set the QR code URL from the response
            const qrCodeUrl = response.data.qr_code;
            setQrCodeUrl(qrCodeUrl);

            // Automatically download the QR code
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
                        <div className="card p-4 rounded shadow-lg" style={{ height: 'auto', width: '100%', overflowY: 'auto', maxWidth: '800px' }}>
                            <div className='row m-3'>
                                <div className='col-md-8'>
                                    <h5 style={{ color: 'blue' }}>Add Instructions For QR Scanning</h5>
                                </div>
                                <div className='col-md-4 d-flex justify-content-end'>
                                    <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: "blue" }} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {instructions.map((instruction, index) => (
                                    <div className="mb-3" key={index}>
                                        <div className="input-group">
                                            <textarea
                                                className="form-control"
                                                id={`instruction-${index}`}
                                                rows="2"
                                                value={instruction}
                                                onChange={(e) => handleInstructionChange(index, e)}
                                                placeholder="Enter instruction here..."
                                            ></textarea>
                                        </div>
                                    </div>
                                ))}
                                <div className='d-flex justify-content-center'>
                                    <button style={{ marginLeft: "0px" }} type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                            {qrCodeUrl && (
                                <div className="mt-4 text-center">
                                    <h5 className="mt-4 text-center" style={{ marginRight: '65px' }}>Generated QR Code</h5>
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
