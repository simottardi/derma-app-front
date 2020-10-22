import React from "react";
import NavbarItem from "./NavbarItem";

export default function LoggedOut() {
  return (
    <>
      <NavbarItem path="/login/patient" linkText="Patient Login" />
      <NavbarItem path="/login/doctor" linkText="Doctor Login" />
    </>
  );
}
