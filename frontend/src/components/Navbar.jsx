import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { logoutUser, clearLoginMessage, clearRegisterMessage } from '../redux/reducers/authSlice';
import './NavBar.css'; 

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, loginMessage, registerMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginMessage) {
      alert(loginMessage);
      dispatch(clearLoginMessage());
    }

    if (registerMessage) {
      alert(registerMessage);
      dispatch(clearRegisterMessage());
    }
  }, [loginMessage, registerMessage, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-logo">
          Events
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/events">Events</Nav.Link>
                <Nav.Link as={Link} to="/events/new">Create Event</Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="navbar-buttons">
            {isLoggedIn ? (
              <Button onClick={handleLogout} variant="outline-light" className="ml-2">
                Logout
              </Button>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-light" className="ml-2">
                  Login
                </Button>
                <Button as={Link} to="/register" variant="outline-light" className="ml-2">
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
