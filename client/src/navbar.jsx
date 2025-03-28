import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaBars } from 'react-icons/fa';
import logo from './assets/FindItLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyNavBar() {
  return (
    <>
      <Navbar className="navbar-maroon sticky-top" style={{ backgroundColor: '#500000', zIndex:10}}>
        <Container>

          <Navbar.Brand href="#home">
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-custom-components" style={{ color: 'white' }}>
                <FaBars /> {/* Hamburger icon */}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* Dropdown items */}
                <Dropdown.Item href="#home">Home</Dropdown.Item>
                <Dropdown.Item href="#other">Other</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Brand>

          {/* Center-aligned Logo */}
          <Navbar.Brand className="mx-auto" href="#home">
            <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="FindIt A&M logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavBar;