import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "@material-ui/core/Button";
import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";

import { selectDoctor } from "../../store/doctor/selectors";
import { logOutDoc } from "../../store/doctor/actions";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const doctor = useSelector(selectDoctor);

  return (
    <>
      {token ? (
        <Nav.Item>{user.email}</Nav.Item>
      ) : (
        <Nav.Item>{doctor.email}</Nav.Item>
      )}
      {token ? (
        <Button onClick={() => dispatch(logOut())}>Logout</Button>
      ) : (
        <Button onClick={() => dispatch(logOutDoc())}>Logout</Button>
      )}
    </>
  );
}
