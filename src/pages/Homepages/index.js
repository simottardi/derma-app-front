import React from "react";
import { useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import { selectUser } from "../../store/user/selectors";
import { useHistory } from "react-router-dom";
import PatientCard from "../../components/PatientCard";
import { Button } from "@material-ui/core";

/* import { selectDoctor } from "../../store/doctor/selectors";
 */
export default function HomePages() {
  const { token } = useSelector(selectUser);
  /*   const { tokenDoctor } = useSelector(selectDoctor); */

  const history = useHistory();

  if (token !== null) {
    console.log("token not null");

    history.push("/myhomepage/");
  }
  // !! this is breaking the app
  /*   if (tokenDoctor !== null) {
    console.log("tokenDoctor not null");
    history.push("/doctor/homepage");
  } else if (token !== null) {
    console.log("token not null");

    history.push("/myhomepage/");
  } else {
    console.log("token null");

    history.push("/");
  } */

  return (
    <>
      <Jumbotron className="bg-dark text-light">
        <h1>Welcome to DermaApp</h1>
      </Jumbotron>
      <Container className="text-center text-light h-100">
        <PatientCard />
        <Button variant="contained" color="secondary">
          Click Me!
        </Button>
        <Button variant="contained" color="primary">
          Click Me!
        </Button>
      </Container>
    </>
  );
}
