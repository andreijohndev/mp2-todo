

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

function LandingPage() {
  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <div className="text-right">
            <Button variant="primary" size="lg" as={Link} to="/signup">
              Sign Up Now
            </Button>
            <Button variant="secondary" size="lg" className="me-lg-1 mx-sm-2" as={Link} to="/login">
              Log In
            </Button>
          </div>
          <h2>Welcome to My To-Do List!</h2>
          <p className="lead">
            Stay organized and productive with our powerful and intuitive to-do list application. Whether you're managing
            personal tasks, work projects, or planning your daily routine, we've got you covered. Take control of your
            tasks and boost your productivity with My To-Do List.
          </p>
        </Card.Body>
      </Card>

      <h1 className="mt-4">My To-Do List</h1>

      <Row>
        <Col lg={6}>
          <h2>Features:</h2>
          <ol>
            <li>Create and Manage Tasks</li>
            <li>Set Reminders and Notifications</li>
            <p>
              Never miss a deadline again! Set reminders and receive notifications via email or mobile push
              notifications. Customize your reminders to suit your preferences, ensuring you stay on top of your tasks
              at all times.
            </p>
            <li>Collaborate with Others</li>
            <p>
              Collaboration made simple! Share your tasks and projects with colleagues, friends, or family members.
              Assign tasks to team members and track their progress. Keep everyone on the same page and achieve your
              goals together.
            </p>
          </ol>
        </Col>

        <Col lg={6}>
          <h2>More Features:</h2>
          <ol>
            <li>Prioritize and Sort</li>
            <p>
              Focus on what matters most. Prioritize your tasks based on urgency, importance, or personal preferences.
              Sort tasks by due date, priority, or category to easily visualize your workload and make informed
              decisions.
            </p>
            <li>Track Progress and Completion</li>
            <p>
              Stay motivated by tracking your progress. Mark tasks as complete, and watch your to-do list shrink. Gain a
              sense of accomplishment as you see your completed tasks stack up, providing the momentum to keep going.
            </p>
          </ol>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <h2>Get Started Today!</h2>
          <p className="lead">
            Sign up now and take control of your tasks. Experience the power of efficient task management with My To-Do
            List. Increase your productivity, reduce stress, and achieve your goals effectively. Start organizing your life
            today!
          </p>
          <Button variant="primary" size="lg" as={Link} to="/signup">
            Sign Up Now
          </Button>
          <Button variant="secondary" size="lg" className="mx-sm-2" as={Link} to="/login">
            Log In
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LandingPage;
