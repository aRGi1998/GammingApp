import React, { useState } from 'react';
import Header from '../CommonComponent/Header';
import Footer from '../CommonComponent/Footer';
import axios from 'axios';

function FuListingPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedTypes = ['image/png', 'image/jpeg'];

        if (file && allowedTypes.includes(file.type)) {
            setSelectedFile(file);
            setError('');
        } else {
            setSelectedFile(null);
            setError('Please select a valid PNG or JPG file.');
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

        formData.append('file', selectedFile);

        // Example API endpoint to handle file upload
        const apiUrl = 'https://example.com/upload';

        axios.post(apiUrl, formData)
            .then(response => {
                console.log('File uploaded successfully:', response.data);
                // Add your success handling logic here
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                setError('Failed to upload file.');
            });
    };

    return (
        <>
            <Header />
            <div className="container-fluid bg-gradient" style={{ overflow: 'hidden' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 181px)' }}>
                    <div className="col-md-8 d-flex justify-content-center">
                        <div className="card text-white p-4 rounded shadow-lg" style={{ height: '60vh', width: '100%', overflowY: 'auto', maxWidth: '600px' }}>
                            <h5 style={{ color: 'black' }}>Instructions List</h5>
                            <ul style={{ color: 'black' }} className="list-group mb-3">
                                <li className="list-group-item">Dummy</li>
                                <li className="list-group-item">Dummy</li>
                                <li className="list-group-item">Dummy</li>
                                <li className="list-group-item">Dummy</li>
                                <li className="list-group-item">Dummy</li>
                                <li className="list-group-item">Dummy</li>
                                <li className="list-group-item">Dummy</li>
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
                                <div className="mt-5 d-flex justify-content-center">
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

export default FuListingPage;
