

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';

function LogInPage() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogInSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Username and password are required.');
    } else {
      setErrorMessage('');
      axios
        .post('/api/authenticate', {
          username: username,
          password: password
        })
        .then(function (response) {
          sessionStorage.setItem('authToken', response.data.token);
          if (rememberMe) {
            localStorage.setItem('rememberedUser', username);
          } else {
            localStorage.removeItem('rememberedUser');
          }
          navigate('/dashboard');
        })
        .catch(function (error) {
          setErrorMessage('Failed to log in. Please check your credentials.');
        });
    }
  };

  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      setUsername(rememberedUser);
      setRememberMe(true);
    }
  }, []);

  return (
    <Container className="mt-3">
      <h2>Login</h2>
      <Form onSubmit={handleLogInSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control className="mb3"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <FormGroup controlId="rememberMe" className="mb-3">
          <FormControl
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <FormLabel className="ms-2">Remember Me</FormLabel>
        </FormGroup>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <div className="button-group">
          <Button type="submit" variant="success" className="mt-3">
            Log In
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default LogInPage;
