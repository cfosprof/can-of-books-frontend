import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="bottom">
        <Navbar.Brand>
          Cam Code&nbsp;
          <a href="https://github.com/CodrCam" target="_blank" rel="noopener noreferrer">
          <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/Github-Dark.svg" alt="GitHub profile of CodrCam" width="100" height="100"></img>
          </a>
          Chris Code&nbsp;
          <a href="https://github.com/cfosprof" target="_blank" rel="noopener noreferrer">
          <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/Github-Dark.svg" alt="GitHub profile of cfosprof" width="100" height="100"></img>
          </a>
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
