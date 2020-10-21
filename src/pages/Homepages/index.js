 import React from "react";
 import {  useSelector } from "react-redux";
 import Jumbotron from "react-bootstrap/Jumbotron";
 import Container from "react-bootstrap/Container";

 import { selectUser } from "../../store/user/selectors";
 import { useHistory } from "react-router-dom";
import PatientCard from "../../components/PatientCard";

 export default function HomePages() {



   const { token} = useSelector(selectUser);

   const history = useHistory();


 if (token !== null) {

   console.log("token not null")

   history.push("/myhomepage/");

 }

  return (
    <>
      <Jumbotron>
        <h1>Welcome to DermaApp</h1>
      </Jumbotron>
      <Container>
      <PatientCard/>
      </Container>
    </>
  );
}
