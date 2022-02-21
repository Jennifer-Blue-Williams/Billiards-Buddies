import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./NavBar.css";

export const NavBar = (props) => {
  return (
    <>
      <Navbar bg="dark" expand="lg">
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
      </Navbar>
    </>
  );
};
