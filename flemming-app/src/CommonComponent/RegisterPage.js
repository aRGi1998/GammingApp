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
    };

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
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const re = /^[0-9]+$/;
        return re.test(phoneNumber);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!validateEmail(email)) {
            validationErrors.email = ['Invalid email format'];
        }

        if (!validatePhoneNumber(phoneNumber)) {
            validationErrors.phoneNumber = ['Phone number must be numeric'];
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        axios.post('https://api-flrming.dhoomaworksbench.site/api/student/', {
            username: username,
            password: password,
            email: email,
            contact_number: phoneNumber,
            student_code: "null",
            collage_name: campus // Add the selected campus name here
        })
            .then(res => {
                console.log(res.data);
                navigate('/register-otp', { state: { email: email } });
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
            <form className="register-form" onSubmit={handleSubmit}>
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
                    <select
                        style={{ backgroundColor: 'white' }}
                        id="campus"
                        value={campus}
                        onChange={handleCampusChange}
                        required
                    >
                        <option value="" disabled>Select Your Campus</option>
                        <option value="Sutherland">Sutherland</option>
                        <option value="Lindsay">Lindsay</option>
                        <option value="Haliburton">Haliburton</option>
                    </select>
                </div>
                <button className="btn btn-primary btn-lg" type="submit">SUBMIT</button>
                {Object.keys(errors).map((key, index) => (
                    <p style={{ color: 'red' }} key={index} className="error-message">{key}: {errors[key].join(', ')}</p>
                ))}
            </form>
        </div>
    );
}

export default RegisterPage;
