import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="bottom">
        <Navbar.Brand>
          Cam and Chris code&nbsp;
          <a href="https://github.com/CodrCam" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          &nbsp;
          <a href="https://github.com/cfosprof" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
