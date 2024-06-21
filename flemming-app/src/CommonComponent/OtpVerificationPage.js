import React, { useState } from 'react';
import '../StyleComponent/OtpPage.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
    otp: ["", "", "", ""]
};

function OtpVerificationPage() {
    const location = useLocation();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState(initialValues.otp);

    const handleChange = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        
        try {
            const response = await axios.post('https://api-flrming.dhoomaworksbench.site/api/student/otp-reset-password/', 
            {
                email: email,
                otp: otpString
            });

            console.log('OTP verified successfully:', response.data);
            // Handle success, maybe navigate to reset password page or show success message
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
                <div className="otp-resend">Didn’t get the code ? Resend</div>
                <button type="submit" className="submit-btn">
                    Verify Account
                </button>
            </form>
        </div>
    );
}

export default OtpVerificationPage;
