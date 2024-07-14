// import React, { useState } from 'react';
// import axios from 'axios';
// import Header from '../CommonComponent/Header';
// import Footer from '../CommonComponent/Footer';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// function FileUploadPage() {
//     const [instructions, setInstructions] = useState(['']);
//     const token = sessionStorage.getItem('accessToken');
//     const navigate = useNavigate();

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
//     const campusName = sessionStorage.getItem('campusName');

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const description = instructions.join('\n');

//         const dataToSend = {
//             tittle: '',
//             level: 0,
//             description: description,
//             status: true,
//             mode: 'image',
//             collage_name: campusName,
//             game_type: 2,
//             options: []
//         };
//         try {
//             const response = await axios.post('https://api-flrming.dhoomaworksbench.site/api/game/', dataToSend, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             if (response.data) {
//                 alert('Instruction Created Successfully!')
//                 // Clear form data
//                 setInstructions(['']);
//             }
//             // Handle success (e.g., display a success message or redirect)
//         } catch (error) {
//             console.error('Error:', error);
//             // Handle error (e.g., display an error message)
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
//                 <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
//                     <div className="col-md-8 d-flex justify-content-center">
//                         <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '800px' }}>
//                             <div className='row m-3'>
//                                 <div className='col-md-8'>
//                                     <h5 style={{ color: 'blue' }}>Add Instructions For File Uploading</h5>
//                                 </div>
//                                 <div className='col-md-4 d-flex justify-content-end'>
//                                     <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: "blue" }} />
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 {instructions.map((instruction, index) => (
//                                     <div className="mb-3" key={index}>
//                                         <label htmlFor={`instruction-${index}`} className="form-label">Instruction {index + 1}</label>
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
//                                     <button style={{ marginLeft: '0px' }} type="submit" className="btn btn-primary">Submit</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default FileUploadPage;
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function FileUploadPage() {
    const [instructions, setInstructions] = useState(['']);
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
            level: 0,
            description: description,
            status: true,
            mode: 'image',
            collage_name: campusName,
            game_type: 2,
            options: []
        };
        try {
            const response = await axios.post('https://api-flrming.dhoomaworksbench.site/api/game/', dataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {
                alert('Instruction Created Successfully!');
                // Clear form data
                setInstructions(['']);
            }
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
                        <div className="card p-4 text-white p-4 rounded shadow-lg" style={{ height: 'auto', width: '100%', overflowY: 'auto', maxWidth: '800px' }}>
                            <div className='row m-3'>
                                <div className='col-md-8'>
                                    <h5 style={{ color: 'blue' }}>Add Instructions For File Uploading</h5>
                                </div>
                                <div className='col-md-4 d-flex justify-content-end'>
                                    <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: "blue" }} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {instructions.map((instruction, index) => (
                                    <div className="mb-3" key={index}>
                                        <label htmlFor={`instruction-${index}`} className="form-label">Instruction {index + 1}</label>
                                        <textarea
                                            className="form-control"
                                            id={`instruction-${index}`}
                                            rows="2"
                                            value={instruction}
                                            onChange={(e) => handleInstructionChange(index, e)}
                                            placeholder="Enter instruction here..."
                                        ></textarea>
                                    </div>
                                ))}
                                <div className='d-flex justify-content-center'>
                                    <button style={{ marginLeft: '0px' }} type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default FileUploadPage;
