// import React, { useState, useEffect } from 'react';
// import './componentStyles/RegisterPage.css';
// import logo from '../assests/logo.png';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function RegisterPage() {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         contact_number: '',
//         password: '',
//         campus: ''
//     });

//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [campus, setCampus] = useState('');
//     const navigate = useNavigate();
//     const handleUsernameChange = (e) => {
//         setUsername(e.target.value);
//     }
//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handlePhoneChange = (e) => {
//         setPhoneNumber(e.target.value);
//     };

//     const handleCampusChange = (e) => {
//         setCampus(e.target.value);
//     }

//     // const handleSubmit = async e => {
//     //     e.preventDefault();

//     //     try {
//     //         const response = await axios.post('https://api-flrming.dhoomaworksbench.site/api/student/', {

//     //                 password: password,
//     //                 email: email,
//     //                 contact_number: phoneNumber,
//     //                 student_code: "null"
//     //         });

//     //         console.log('Registration successful:', response.data);
//     //         // Add any necessary logic for successful registration
//     //     } catch (error) {
//     //         console.error('Registration failed:', error);
//     //         // Handle registration error
//     //     }
//     // };


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Sending the form data as JSON string
//         axios.post('https://api-flrming.dhoomaworksbench.site/api/student/', {
//             username: username,
//             password: password,
//             email: email,
//             contact_number: phoneNumber,
//             student_code: "null"
//         })
//             .then(res => {
//                 console.log(res.data)
//                 navigate('/');
//             })
//             .catch(error => {
//                 console.log(error.response.data, 'error');
//             });
//     };

//     return (
//         <div className="wrapper">
//             <div className="background-image"></div>
//             <div className="gradient"></div>
//             <form className="register-form">
//                 <img className="register-logo" src={logo} alt="logo" />
//                 <div className="form-group">
//                     <input
//                         type="text"
//                         id="username"
//                         value={username}
//                         onChange={handleUsernameChange}
//                         // className="input-with-icon"
//                         placeholder="Enter Your Username"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <input
//                         type="text"
//                         id="email"
//                         value={email}
//                         onChange={handleEmailChange}
//                         // className="input-with-icon"
//                         placeholder="Email"
//                     />
//                 </div>
//                 <div className="form-group">
//                     {/* <img src="/path/to/password-icon.png" alt="Password Icon" className="input-icon" /> */}
//                     <input
//                         type="text"
//                         id="phoneNumber"
//                         placeholder="Phone Number"
//                         value={phoneNumber}
//                         onChange={handlePhoneChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     {/* <img src="/path/to/password-icon.png" alt="Password Icon" className="input-icon" /> */}
//                     <input
//                         type="password"
//                         id="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={handlePasswordChange}
//                     />
//                 </div>
//                 <div className="form-group" >
//                     {/* <img src="/path/to/password-icon.png" alt="Password Icon" className="input-icon" /> */}
//                     <input
//                         style={{ backgroundColor: 'red' }}
//                         type="text"
//                         id="campus"
//                         placeholder="Campus"
//                         value={campus}
//                         onChange={handleCampusChange}
//                     />
//                 </div>
//                 <button onClick={handleSubmit} className="btn btn-primary btn-lg" type="submit">SUBMIT</button>
//             </form>
//         </div>
//     );
// }

// export default RegisterPage;



import React, { useState } from 'react';
import '../StyleComponent/RegisterPage.css';
import logo from '../assests/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [campus, setCampus] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleCampusChange = (e) => {
        setCampus(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://api-flrming.dhoomaworksbench.site/api/student/', {
            username: username,
            password: password,
            email: email,
            contact_number: phoneNumber,
            student_code: "null"
        })
            .then(res => {
                console.log(res.data)
                navigate('/');
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    setErrors(error.response.data); // Set errors state
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
    };

    return (
        <div className="wrapper">
            <div className="background-image"></div>
            <div className="gradient"></div>
            <form className="register-form">
                <img src={logo} alt="logo" style={{ width: '50%', height: '20%', marginBottom: '20px' }} />
                <div className="form-group">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter Your Username"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        style={{ backgroundColor: 'white' }}
                        type="text"
                        id="campus"
                        placeholder="Campus"
                        value={campus}
                        onChange={handleCampusChange}
                        required
                    />
                </div>
                <button onClick={handleSubmit} className="btn btn-primary btn-lg" type="submit">SUBMIT</button>
                {Object.keys(errors).map((key, index) => (
                    <p style={{ color: 'red' }} key={index} className="error-message">{key}: {errors[key].join(', ')}</p>
                ))}
            </form>
        </div>
    );
}

export default RegisterPage;

