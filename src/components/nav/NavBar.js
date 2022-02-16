import React from "react";
import { Container, NavDropdown, Navbar, Nav } from "react-bootstrap";
import "./NavBar.css";

export const NavBar = (props) => {
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Billiards Buddies</Navbar.Brand>
          <Nav.Link href="/players">Players</Nav.Link>
          <Nav.Link href="/games/create">Record Game</Nav.Link>
          <Nav.Link href="/mygames">My Games</Nav.Link>
          <Nav.Link
            id="navbar_logout"
            href="/login"
            onClick={() => {
              localStorage.removeItem("billiards_player");
            }}
          >
            Logout
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
