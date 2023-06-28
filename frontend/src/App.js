

import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LogInPage';
import SignUpPage from './components/SignUpPage';
import ResetPassWord from './components/ResetPassWord';
import ToDoList from './components/ToDoList';

function App() {
  return (
    <Router>
      <Container>
        <Navbar expand="sm" bg="light" variant="light" className="mb-4">
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset-password" element={<ResetPassWord />} />
          <Route path="/Todolist" element={<ToDoList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
