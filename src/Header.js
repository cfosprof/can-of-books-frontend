import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Navbar.Brand><Link to="/" className="navbar-brand">My Favorite Books</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Link to="/" className="nav-link">Home</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/About" className="nav-link">About</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
