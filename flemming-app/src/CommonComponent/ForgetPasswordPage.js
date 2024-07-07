import React, { useState } from 'react';
import logo from '../assests/logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api-flrming.dhoomaworksbench.site/api/student/forgot-password/',
                {
                    email: email
                });

            // Pass email as state when navigating
            if (response.data) {
                navigate('/otp', { state: { email: email } });
            }

        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className="wrapper">
            <div className="background-image"></div>
            <div className="gradient"></div>
            <form onSubmit={handleSubmit} className="register-form">
                <img src={logo} alt="logo" />
                <h2 style={{ color: 'white' }}>Login To Your Account</h2>
                <div className="form-group">
                    <input
                        type="text"
                        id="email"
                        placeholder='Email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <button className="btn btn-primary btn-lg" type="submit">Verify your Email</button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
