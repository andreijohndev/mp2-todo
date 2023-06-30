import React, { useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
