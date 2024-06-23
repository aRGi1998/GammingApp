import React, { useState , useEffect } from 'react';
import axios from 'axios';
import Footer from '../CommonComponent/Footer';
import Header from '../CommonComponent/Header';
import Modal from 'react-modal'
import Tenor from '../assests/tenor.gif'
import {Link,useNavigate} from 'react-router-dom'


function FuListingPage({ data }) {
    console.log("data",data)
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ message: '' , linkUrl: '/game-list?taskId=2' }); // imageUrl: false , linkUrl: '/game-list?taskId=2'
    const navigate = useNavigate();

    let descriptions = '' || [] 
    if ( data.description.includes("\n") ) {
         descriptions = data?.description.split('\n')
    } else {
        descriptions = data.description
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file.type)
        const allowedTypes = ['.png', '.jpeg' , 'image/png' , 'image/jpeg'];

        if (file && allowedTypes.includes(file.type)) {
            setSelectedFile(file);
            setError('');
        } else {
            setSelectedFile(null);
            setModalContent({ message: 'Please select a valid PNG or JPG file' , linkUrl:'' });
            setShowModal(true);            
        }
    };

    const handleResult = async (result,answer) => {
        if (result) {
            try {
                const payload = {
                    "game_id": data.id,
                    "notes": 0,
                    "answer_value": answer, 
                    "status": "C"
                };
                const response = await axios.post('https://api-flrming.dhoomaworksbench.site/user-game-update', payload, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                    }
                });

                if (response.status === 200) {
                    setModalContent({ message: 'Well,Done !' , linkUrl: '/game-list?taskId=2' });
                    setShowModal(true);
                }
            } catch (error) {
                const payload = {
                    "game_id": data.id,
                    "notes": 0,
                    "answer_value": result, 
                    "status": "F"
                };
                const response = await axios.post('https://api-flrming.dhoomaworksbench.site/user-game-update', payload, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                    }
                });                
                console.error('Error posting scan result:', error);
                setModalContent({ message: 'Well,Done !' , linkUrl: '/game-list?taskId=2'  });
                setShowModal(true);
            }
        }
    };    


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setError('Please select a file.');
            return;
        }

        const formData = new FormData();
        console.log(formData,'data')
        console.log(selectedFile,'selectedFile')

        formData.append('profile','0')
        formData.append('picture', selectedFile);

        // Example API endpoint to handle file upload
        const apiUrl = 'https://api-flrming.dhoomaworksbench.site/file-update';

        axios.post(apiUrl, formData, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                let answerBuilder = `https://api-flrming.dhoomaworksbench.site/${response.data.picture}`
                handleResult(response.status,answerBuilder)
                // Add your success handling logic here
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                setModalContent({ message: error.message});
                setShowModal(true);
            });        
    };


    return (
        <>
            <Header/>
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                            <h5 style={{ color: 'black' }}>Instructions List</h5>
                            <ul style={{ color: 'black' }} className="list-group mb-3">
                                {
                                    typeof descriptions === 'string' ? (
                                        <li className="list-group-item">{descriptions}</li>
                                    ) : (
                                        descriptions.map((describe,index) => (
                                            <li key={index} className="list-group-item">{describe}</li>
                                        ))
                                    )
                                }
                                {/* Uncomment and use instructions array to display dynamic instructions
                                {instructions.map((instruction, index) => (
                                    <li key={index} className="list-group-item" style={{color: 'black'}}>
                                        {instruction}
                                    </li>
                                ))} */}
                            </ul>
                            <h5 style={{ color: 'black' }}>Upload File</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/png, image/jpeg"
                                        onChange={handleFileChange}
                                    />
                                    {error && <div className="text-danger mt-2">{error}</div>}
                                    {selectedFile && (
                                        <div className="mt-2">
                                            <strong>Selected File:</strong> {selectedFile.name}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-5 d-flex justify-content-center align-items-center">
                                    <button style={{ transform: 'translateX(-50%)' }} type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={() => { setShowModal(false); navigate("/game-list?taskId=2") }}
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
                <h2>{modalContent.message}</h2>
                {/* {modalContent.imageUrl && <img src={Tenor} alt="Result" style={{ maxWidth: '100%', height: 'auto' }} />} */}
                {modalContent.linkUrl && <Link to={modalContent.linkUrl}>Back</Link>}
            </Modal>            
            <Footer/>
        </>
    );
}

export default FuListingPage;
