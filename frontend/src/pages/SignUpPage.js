// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
// import axios from 'axios';

// function SignUpPage() {
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordError, setPasswordError] = useState(false);

//   axios.defaults.baseURL = "http://localhost:8080/api";

//   const handleSignUpFormSubmit = (event) => {
//     event.preventDefault();

//     axios
//       .post('/api/register', {
//         username: name,
//         password: password
//       })
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   const handleLoginClick = () => {
//     window.location.href = '/login';
//   };

//   return (
//     <div>
//       <Container>
//         <Row className="vh-100 d-flex justify-content-center align-items-center">
//           <Col md={8} lg={6} xs={12}>
//             <Card className="shadow px-4">
//               <Card.Body>
//                 <div className="mb-3 mt-md-4">
//                   <h2 className="fw-bold mb-5 text-uppercase ">My To-Do List</h2>
//                   <div className="mb-3">
//                     <Form onSubmit={handleSignUpFormSubmit}>
//                       <Form.Group className="mb-3" controlId="Name">
//                         <Form.Label className="text-center">
//                           Name
//                         </Form.Label>
//                         <Form.Control type="text" placeholder="Enter Name" value={name}
//                            onChange={(e) => setName(e.target.value)} />
//                       </Form.Group>
//                       <Form.Group className="mb-3" controlId="formBasicPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control type="password" placeholder="Password"  value={password}
//                            onChange={(e) => setPassword(e.target.value)} />
//                       </Form.Group>
//                       <Form.Group className="mb-3" controlId="formBasicPassword">
//                         <Form.Label>Confirm Password</Form.Label>
//                         <Form.Control type="password" placeholder="Password"  value={confirmPassword}
//                            onChange={(e) => setConfirmPassword(e.target.value)}/>
//                       </Form.Group>
//                       {passwordError && (
//                         <Alert variant="danger">
//                           Password and confirm password must match.
//                         </Alert>
//                       )}
//                       <div className="d-grid">
//                         <Button variant="primary" type="submit">
//                           Create Account
//                         </Button>
//                       </div>
//                     </Form>
//                     <div className="mt-3">
//                       <p className="mb-0  text-center">
//                       Already have an account??{" "}
//                         <Link to="/login" onClick={handleLoginClick}>
//                           Sign in
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

// export default SignUpPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

function SignUpPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false); // Track password error

  const handleSignUpFormSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError(true); // Set password error if passwords don't match
      return;
    }

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
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-5 text-uppercase ">My To-Do List</h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSignUpFormSubmit}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Form.Group>
                      {passwordError && (
                        <Alert variant="danger">
                          Password and confirm password must match.
                        </Alert>
                      )}
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Already have an account??{' '}
                        <Link to="/login" onClick={handleLoginClick}>
                          Sign in
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

export default SignUpPage;
