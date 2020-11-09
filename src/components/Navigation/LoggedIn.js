import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
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
        <Nav.Item style={{ padding: ".5rem 1rem" }} className="text-light">
          {user.email}
        </Nav.Item>
      ) : (
        <Nav.Item style={{ padding: ".5rem 1rem" }} className="text-light">
          {doctor.email}
        </Nav.Item>
      )}
      {token ? (
        <Button
          onClick={() => dispatch(logOut())}
          className="btn mb-2 btn-sm btn-danger"
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => dispatch(logOutDoc())}
          className="btn mb-2 btn-sm btn-danger"
        >
          Logout
        </Button>
      )}
    </>
  );
}
