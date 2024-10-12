import React from 'react';
import { Navbar, Nav, Form, Button, Container, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DashNav({ onSearch }) {
  return (
    <Navbar style={{ backgroundColor: '#343a40' }} variant="dark" expand="lg" className="mb-3 static-top">
      <Container fluid>
        <Navbar.Brand href="/">GameStore Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Offcanvas Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#action1">
                <i className="fas fa-bell fa-fw"></i>
                <span className="badge badge-danger">9+</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/" className="btn btn-primary">
                Website
              </Nav.Link>
              <NavDropdown title={<i className="fas fa-user-circle fa-fw"></i>} id="userDropdown">
                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#">Activity Log</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Search Form */}
            <Form className="d-flex ml-auto my-2 my-md-0" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="search"
                placeholder="Search for products..."
                className="me-2"
                aria-label="Search"
                onChange={(e) => onSearch(e.target.value)} 
              />
              <Button variant="outline-primary" type="submit">
                <i className="fas fa-search"></i>
              </Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default DashNav;
