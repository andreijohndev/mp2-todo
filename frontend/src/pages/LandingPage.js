import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <h3 className="text-center m-auto">Welcome to My To-Do List</h3>
//     </nav>
//   );
// }

function LandingPage() {
  return (
    <Container fluid>
      <NavigationBar />
      <Row className="justify-content-center">
        <Col lg={9}>
          <Card className="mt-4">
            <Card.Body>
              <div className="text-right">
                <Button variant="primary" size="lg" as={Link} to="/signup">
                  Sign Up Now
                </Button>
                {/* <Button variant="secondary" size="lg" className="me-lg-1 mx-sm-2" as={Link} to="/login">
                  Sign In
                </Button> */}
              </div>
              <p className="lead">
                Stay organized and productive with our powerful and intuitive to-do list application. Whether you're managing
                personal tasks, work projects, or planning your daily routine, we've got you covered. Take control of your
                tasks and boost your productivity with My To-Do List.
              </p>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <h2>Get Started Today!</h2>
              <p className="lead">
                Sign up now and take control of your tasks. Experience the power of efficient task management with My To-Do
                List. Increase your productivity, reduce stress, and achieve your goals effectively. Start organizing your life
                today!
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <h2 className="mt-4">Features:</h2>
          <ol>
            <li>Create and Manage Tasks</li>
            <li>Prioritize and Sort</li>
            <p>
              Focus on what matters most. Prioritize your tasks based on urgency, importance, or personal preferences and easily visualize your workload and make informed decisions.
            </p>
            <li>Track Progress and Completion</li>
            <p>
              Stay motivated by tracking your progress. Mark tasks as complete, and watch your to-do list shrink. Gain a
              sense of accomplishment as you see your completed tasks stack up, providing the momentum to keep going.
            </p>
          </ol>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
