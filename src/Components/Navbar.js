import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            exact
            to="/"
            className="Navbar"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
           Login
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/contact"
            className="Navbar"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            Contact
          </NavLink>
        </li>

      </ul>
    </div>
  );
}
