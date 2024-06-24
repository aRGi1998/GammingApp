
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginPage from './CommonComponent/LoginPage';
import RegisterPage from './CommonComponent/RegisterPage';
import AdminHomePage from './AdminComponent/AdminHomePage';
import McqCreationPage from './AdminComponent/McqCreationPage';
import FileUploadPage from './AdminComponent/FileUploadPage';
import QrCreationPage from './AdminComponent/QrCreationPage';
import StudentListPage from './AdminComponent/StudentListPage';
import StudentDetailPage from './AdminComponent/StudentDetailPage';
import QuestionListPage from './AdminComponent/QuestionListPage';
import HomePage from './StudentComponent/HomePage';
import LevelListPage from './StudentComponent/LevelListPage';
import GameListPage from './StudentComponent/GameListPage';
import McqListingPage from './StudentComponent/McqListingPage';
import FuListingPage from './StudentComponent/FuListingPage';
import ScannerListing from './StudentComponent/ScannerListing';
import StatusPage from './StudentComponent/StatusPage';
import ForgotPasswordPage from './CommonComponent/ForgetPasswordPage';
import OtpVerificationPage from './CommonComponent/OtpVerificationPage';
import NetworkStatus from './CommonComponent/NetWorkStatus';

function App() {
  return (
    <Router>
      <div className="App">
          <NetworkStatus/>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin-home" element={<AdminHomePage />} />
            <Route path="/mcq-creation" element={<McqCreationPage />} />
            <Route path="/fu-creation" element={<FileUploadPage />} />
            <Route path="/qr-creation" element={<QrCreationPage />} />
            <Route path="/student-list" element={<StudentListPage />} />
            <Route path="/student-detail/:id" element={<StudentDetailPage />} /> 
            <Route path="/question-list" element={<QuestionListPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/levels" element={<LevelListPage />} />
            <Route path="/game-list" element={<GameListPage />} />
            <Route path="/mcq-list" element={<McqListingPage />} />
            <Route path="/fu-list" element={<FuListingPage />} />
            <Route path="/qr-list" element={<ScannerListing />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/forgot-pwd" element={<ForgotPasswordPage />} />
            <Route path="/otp" element={<OtpVerificationPage />} />

          </Routes>
        </div>
    </Router>
  );
}

export default App;
