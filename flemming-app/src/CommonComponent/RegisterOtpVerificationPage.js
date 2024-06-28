import React, { useState } from 'react';
import '../StyleComponent/OtpPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
    otp: ["", "", "", "", "", ""]
};

function RegisterOtpVerificationPage() {
    const location = useLocation();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState(initialValues.otp);
    const navigate = useNavigate();
    
    const handleChange = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');

        const apiEndpoint = 'https://api-flrming.dhoomaworksbench.site/api/student/otp-verification/';
        const payload = {
            mail_otp: otpString,
            email: email
        };

        try {
            const response = await axios.post(apiEndpoint, payload);
            console.log('OTP verified successfully:', response.data);
            if (response.data.status === true && response.data.message === "Mail verified successfully.") {
                navigate('/login'); // Redirect to login page
            } else {
                // Handle other cases, maybe show an error message
                alert( response.data.message)
                console.error('Error verifying OTP:', response.data.message);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            // Handle error, maybe show an error message to the user
        }
    };

    return (
        <div className="wrapper">
            <div className="background-image"></div>
            <div className="gradient"></div>
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 style={{ color: 'white' }}>Verify Your Account</h2>
                <p style={{ color: 'white' }}>Email: {email}</p>
                <div className="otp-inputs">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            className="otp-input"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                        />
                    ))}
                </div>
                <div className="otp-resend">Didn’t get the code? Resend</div>
                <button type="submit" className="submit-btn">
                    Verify Account
                </button>
            </form>
        </div>
    );
}

export default RegisterOtpVerificationPage;
