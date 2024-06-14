import React from 'react';
import '../StyleComponent/OtpPage.css';

const initialValues = {
    otp: [
        { digit: "" },
        { digit: "" },
        { digit: "" },
        { digit: "" },
        { digit: "" },
        { digit: "" }
    ]
};

function OtpVerificationPage() {
    return (
        <div className="wrapper">
            <div className="background-image"></div>
            <div className="gradient"></div>
            <form className="register-form">
            <h2 style={{ color: 'white' }}>Verify Your Account</h2>
                <div className="otp-inputs">
                    {initialValues.otp.map((item, index) => {
                        return (
                            <input
                                className="otp-input"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={1}
                            />
                        );
                    })}
                </div>
                 <div className="otp-resend">Didn’t get the code ? Resend or Call Us</div>
                <button type="submit" className="submit-btn"> 
                <a href="/">Verify Account</a>
                </button>
            </form>
            {/* <div className="otp-resend">Didn’t get the code ? Resend or Call Us</div> */}
        </div>
    );
}
export default OtpVerificationPage