import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  /*         <footer id="sticky-footer" className="py-2 bg-dark text-white-50">
        <div className="container text-center"></div> */

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="navbar navbar-dark bg-secondary bg-dark "
    >
      <Navbar.Brand as={NavLink} to="/">
        DermaApp
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          {!token ? <NavbarItem path="/" linkText="Home" /> : null}
          {token ? (
            <NavbarItem
              path="/myhomepage"
              linkText="My Page"
              className="bg-dark text-white-50"
            />
          ) : null}
          {token ? (
            <NavbarItem path="/myhistory" linkText="My history" />
          ) : null}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
