import React, { useState }  from 'react';
import './componentStyles/ForgetPasswoed.css';
import logo from '../assests/logo.png';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value); 
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Sending the email to the API
            const response = await axios.post('https://api-flrming.dhoomaworksbench.site/api/api_student_send_verify_email_create', 
            // {
            //     email: email
            // }
        );

            console.log('Email sent successfully:', response.data);
            // Handle success, maybe show a message to the user
        } catch (error) {
            console.error('Error sending email:', error);
            // Handle error, maybe show an error message to the user
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
