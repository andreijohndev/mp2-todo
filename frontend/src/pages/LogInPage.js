import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';

function LogInPage() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  axios.defaults.baseURL = "http://localhost:8080/api";

  const handleLogInSubmit = (event) => {
    event.preventDefault();
    
    axios.post('/authenticate', {
      username: username,
      password: password
    })
    .then(function (response) {
      if (rememberMe) {
        localStorage.setItem('rememberedUser', response.data.username);
        localStorage.setItem('authToken', response.data.token);
      } else {
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('authToken');
        sessionStorage.setItem('authToken', response.data.token);
      }

      navigate('/app');
    })
    .catch(function (error) {
      setErrorMessage('Failed to log in. Please check your credentials.');
    });
  };

  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      setUsername(rememberedUser);
      setRememberMe(true);
    }
  }, []);

  return (
    <div>
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center mt-2">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3">
                <h2 className="fw-bold mb-2 mt-3 text-uppercase text-center">My To-Do List</h2>
                <p className="mb-5 text-center">Please enter your Username and Password!</p>
                <div className="mb-3">
                  <Form onSubmit={handleLogInSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Username
                      </Form.Label>
                      <Form.Control required type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    >
                    </Form.Group>
                    <Form.Group controlId="rememberMe" className="mb-3 mt-3 d-flex">
                    <Form.Check
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      label="Remember Me"/>
                    </Form.Group>
                    {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
                    <div className="button-group d-flex justify-content-center"></div>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default LogInPage;