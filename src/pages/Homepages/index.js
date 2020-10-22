import React from "react";
import { useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import { selectUser } from "../../store/user/selectors";
import { useHistory } from "react-router-dom";
import PatientCard from "../../components/PatientCard";

export default function HomePages() {
  const { token } = useSelector(selectUser);

  const history = useHistory();

  if (token !== null) {
    console.log("token not null");

    history.push("/myhomepage/");
  }

  return (
    <>
      <Jumbotron className="bg-dark text-light">
        <h1>Welcome to DermaApp</h1>
      </Jumbotron>
      <Container className="text-center text-light h-100">
        <PatientCard />
      </Container>
    </>
  );
}
