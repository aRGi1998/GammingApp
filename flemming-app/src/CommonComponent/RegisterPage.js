import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StyleComponent/RegisterPage.css';
import logo from '../assests/logo.png';
import axios from 'axios';


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
                    setErrors(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
    };

    return (
        <div className="wrapper">
            <div className="background-image"></div>
            <div className="gradient"></div>
            <form className="register-form">
                <img className="register-logo" src={logo} alt="logo" />
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
                <div className='mt-4 d-flex justify-content-between align-items-center'>
                    <button onClick={handleSubmit} className="btn btn-primary btn-lg" type="submit">SUBMIT</button>
                </div>
                {Object.keys(errors).map((key, index) => (
                    <p style={{ color: 'red' }} key={index} className="error-message">{key}: {errors[key].join(', ')}</p>
                ))}
            </form>
        </div>
    );
}

export default RegisterPage;