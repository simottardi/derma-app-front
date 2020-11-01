import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { selectTokenDoctor } from "../../store/doctor/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function Navigation() {
  const token = useSelector(selectToken);
  const tokenDoctor = useSelector(selectTokenDoctor);
  console.log("token", token, "tokenDoc", tokenDoctor);

  const loginLogoutControls =
    token || tokenDoctor ? <LoggedIn /> : <LoggedOut />;

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
          {!token && !tokenDoctor ? (
            <NavbarItem path="/" linkText="Home" />
          ) : null}
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
          {tokenDoctor ? (
            <NavbarItem
              path="/doctor/homepage"
              linkText="Doctor Homepage"
              className="bg-dark text-white-50"
            />
          ) : null}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
