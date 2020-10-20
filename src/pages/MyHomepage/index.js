import React from "react";
import { useSelector} from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToday } from "../../store/appState/selectors";
import { useHistory, Link } from "react-router-dom";


import Container from "react-bootstrap/Container";
import {Col}from "react-bootstrap";
import PatientCard from "../../components/PatientCard";


export default function MyHomepage() {
  const { token,name } = useSelector(selectUser);
  const  today = useSelector(selectToday)
  const history = useHistory();


    console.log("today", today )

  if (token === null) {
    console.log("token null")
    history.push("/");
  }

  return (

<Container as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
     <h1>Patient homepage </h1>
     <p>Welcome back <strong>{name}</strong></p>
      <p> Today is {today}  </p>
    <Link to="/newday" style={{ textAlign: "center" }}>         
   Click here to create a new day in your journal.</Link>
   <p></p>
<PatientCard/>     
</Container>

  );
}


  