// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
// import axios from 'axios';

// function LogInPage() {
//   const [password] = useState(''); // Password is not stored in state
//   const [username, setUsername] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const authToken = sessionStorage.getItem('authToken');
//     if (authToken) {
//       navigate('/dashboard'); // Redirect to dashboard if user is already logged in
//     }
//   }, [navigate]);

//   const handleLogInSubmit = (event) => {
//     event.preventDefault();

//     if (username.trim() === '' || password.trim() === '') {
//       setErrorMessage('Username and password are required.'); // Set error message if username or password is empty
//     } else {
//       setErrorMessage('');
//       axios
//         .post('/api/authenticate', {
//           username: username,
//           password: password
//         })
//         .then(function (response) {
//           sessionStorage.setItem('authToken', response.data.token); // Store authentication token in session storage
//           if (rememberMe) {
//             localStorage.setItem('rememberedUser', username); // Store username in local storage if "Remember Me" is checked
//           } else {
//             localStorage.removeItem('rememberedUser'); // Remove username from local storage if "Remember Me" is unchecked
//           }
//           navigate('/dashboard'); // Redirect to dashboard after successful login
//         })
//         .catch(function (error) {
//           setErrorMessage('Failed to log in. Please check your credentials.'); // Set error message for failed login
//         });
//     }
//   };

//   useEffect(() => {
//     const rememberedUser = localStorage.getItem('rememberedUser');
//     if (rememberedUser) {
//       setUsername(rememberedUser); // Set remembered username and check "Remember Me" if it exists in local storage
//       setRememberMe(true);
//     }
//   }, []);

//   return (
//     <div>
//       <Container>
//         <Row className="vh-100 d-flex justify-content-center align-items-center mt-2">
//           <Col md={8} lg={6} xs={12}>
//             <Card className="shadow">
//               <Card.Body>
//                 <div className="mb-3">
//                   <h2 className="fw-bold mb-2 mt-3 text-uppercase text-center">My To-Do List</h2>
//                   <p className=" mb-5 text-center">Please enter your Username and Password!</p>
//                   <div className="mb-3">
//                     <Form>
//                       <Form.Group className="mb-3" controlId="formBasicEmail">
//                         <Form.Label className="text-center">
//                           Username
//                         </Form.Label>
//                         <Form.Control
//                           type="email"
//                           placeholder="Enter username"
//                           value={username}
//                           onChange={(e) => setUsername(e.target.value)}
//                         />
//                       </Form.Group>

//                       <Form.Group
//                         className="mb-3"
//                         controlId="formBasicPassword"
//                       >
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                           type="password"
//                           placeholder="Password"
//                           value={password}
//                           onChange={() => {}}
//                         />
//                       </Form.Group>
//                       <Form.Group
//                         className="mb-3"
//                         controlId="formBasicCheckbox"
//                       >
//                       </Form.Group>
//                       <Form.Group controlId="rememberMe" className="mb-3 mt-3 d-flex">
//                         <Form.Check
//                           type="checkbox"
//                           checked={rememberMe}
//                           onChange={(e) => setRememberMe(e.target.checked)}
//                           label="Remember Me"
//                         />
//                       </Form.Group>
//                       {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
//                       <div className="button-group d-flex justify-content-center"></div>
//                       <div className="d-grid">
//                         <Link to="/todo">
//                           <Button variant="primary" type="submit" onClick={handleLogInSubmit}>
//                             Login
//                           </Button>
//                         </Link>
//                       </div>
//                     </Form>
//                     <div className="mt-3">
//                       <p className="mb-0">
//                         Don't have an account?{' '}
//                         <Link to="/signup" className="text-primary fw-bold">
//                           Sign Up
//                         </Link>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default LogInPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';

function LogInPage() {
  const [password] = useState('');
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
    <div>
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center mt-2">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3">
                <h2 className="fw-bold mb-2 mt-3 text-uppercase text-center">My To-Do List</h2>
                <p className=" mb-5 text-center">Please enter your Username and Password!</p>
                <div className="mb-3">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Username
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
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
                      <Link to="/todo">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </Link>
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
