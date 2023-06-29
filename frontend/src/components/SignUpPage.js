

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function SignUpPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUpFormSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/api/register', {
        username: name,
        password: password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <Container>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSignUpFormSubmit}>
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="confirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="btn-block mt-4">
          Sign Up
        </Button>
      </Form>
      <div className="mt-4">
        <p>
          Already have an account? <Link to="/login" onClick={handleLoginClick}>Log In</Link>
        </p>
      </div>
    </Container>
  );
}

export default SignUpPage;
