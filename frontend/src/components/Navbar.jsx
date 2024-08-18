import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { logoutUser, clearLoginMessage, clearRegisterMessage } from '../redux/reducers/authSlice';

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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link> 
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/events">Events</Nav.Link> {/* Added Events link */}
                <Nav.Link as={Link} to="/events/new">Create Event</Nav.Link> {/* Added Create Event link */}
                <Button onClick={handleLogout} variant="outline-light">Logout</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
