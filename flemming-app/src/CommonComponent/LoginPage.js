import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../StyleComponent/LoginPage.css';
import logo from '../assests/logo.png';
import '../StyleComponent/RegisterPage.css';
import axios from 'axios';
import base64 from 'base-64';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
    setApiError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
    setApiError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setEmailError('Please enter your email.');
      return;
    }

    if (password.trim() === '') {
      setPasswordError('Please enter your password.');
      return;
    }

    // Encode the password using base64
    const encodedPassword = base64.encode(password);

    axios.post('https://api-flrming.dhoomaworksbench.site/api/student/user-login/', {
      password: encodedPassword,
      email: email,
    })
      .then(res => {
        const { access, name, status, is_staff, collage_name, student_id } = res.data;
        if (status) {
          // Store access token, name, and is_staff in session storage
          sessionStorage.setItem('accessToken', access);
          sessionStorage.setItem('userName', name);
          sessionStorage.setItem('isStaff', is_staff.toString()); // Store as string 'true' or 'false'
          sessionStorage.setItem('campusName', collage_name);
          sessionStorage.setItem('studentId', student_id);
          // Redirect based on is_staff value
          if (is_staff) {
            navigate('/admin-home');
          } else {
            navigate('/home');
          }
        } else {
          // Handle error when status is false
          setApiError('Invalid email or password.');
        }
      })
      .catch(error => {
        // Display API error message
        setApiError('Invalid email or password.');
      });
  };

  return (
    <div className="wrapper">
      <div className="background-image"></div>
      <div className="gradient"></div>

      <form onSubmit={handleSubmit} className="register-form">
        <img src={logo} alt="logo" style={{ width: '50%', height: '20%', marginBottom: '20px' }} />
        <h2 style={{ color: 'white' }}>Login To Your Account</h2>
        <div className="form-group">
          <span className='input-icon'>
            {/* <MdEmail className='input-icon-svg'/> */}
          </span>
          <input
            type="text"
            id="email"
            placeholder='Email ID'
            value={email}
            onChange={handleUsernameChange}
          />
          {/* {emailError && <p className="error-message">{emailError}</p>} */}
        </div>
        <div className="form-group">
          <span className='input-icon'>
            {/* <IoMdLock className='input-icon-svg'/> */}
          </span>
          <span className='input-show-password'>
            {/* <AiFillEyeInvisible className='input-icon-svg'/> */}
          </span>
          <input
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
          {/* {passwordError && <p className="error-message">{passwordError}</p>} */}
        </div>
        <div style={{ marginBottom: '25px' }}> {/* Add some margin between buttons */}
          <button className="btn btn-primary btn-lg" type="submit">
            <p>Login</p>
          </button>
        </div>
        <div className="additional-links mt-5">
          <span className="mb-1" style={{ color: 'white' }}>Don't have an account? <a href="/register" style={{ textDecoration: 'underline', color: 'white' }}><span className='link-reg-span'>Sign Up</span></a></span> <br></br>
          <a style={{ textDecoration: 'underline', color: 'white' }} href="/forgot-pwd">Forgotten Password?</a>
        </div>
        {apiError && <p className="error-message" style={{ color: 'red' }}>{apiError}</p>}
      </form>
    </div>
  );
}

export default LoginPage;