import { Container, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Navigate, Link } from 'react-router-dom';

const logout = () => {
  sessionStorage.removeItem('authToken');
  localStorage.removeItem('authToken');
  Navigate('/');
}

const NavUser = () => {
  if (localStorage.getItem("authToken") === null && sessionStorage.getItem("authToken") === null) {
    return (
      <Button variant="primary" as={Link} to="/login">Login</Button>
    );
  } else {
    return (
      <Button variant="danger" onClick={logout()}>Logout</Button>
    );
  }
}

const NavigationBar = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">My To-Do List</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <NavUser/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;