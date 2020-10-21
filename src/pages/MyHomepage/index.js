import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToday } from "../../store/appState/selectors";
import { useHistory, Link } from "react-router-dom";
import { fetchPatientHistory } from "../../store/patientHistory/actions";

import Container from "react-bootstrap/Container";
import { Col, Button } from "react-bootstrap";
import PatientCard from "../../components/PatientCard";
import Chart from "../../components/Chart";
import { selectPatientHistory } from "../../store/patientHistory/selectors";

export default function MyHomepage() {
  const { token, name } = useSelector(selectUser);
  const patientHistory = useSelector(selectPatientHistory);
  const today = useSelector(selectToday);
  const history = useHistory();
  const dispatch = useDispatch();

  //console.log("today", today )

  if (token === null) {
    //console.log("token null")
    history.push("/");
  }

  useEffect(() => {
    //console.log("Use effect  --> fetch patient history dispatched ")
    dispatch(fetchPatientHistory());
  }, [dispatch]);

  const patientHistoryData = patientHistory.map((day) => {
    return { date: `${day.date}`, itchScore: `${day.itchScore}` };
  });

  console.log("PH", patientHistory);
  console.log("PHD", patientHistoryData);

  const data = patientHistoryData.reverse();

  return (
    <Container as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
      <h1>Patient homepage </h1>
      <p>
        Welcome back <strong>{name}</strong>
      </p>
      <p> Today is {today} </p>
      <Link to="/newday" style={{ textAlign: "center" }}>
        Click here to create a new day in your journal.
      </Link>
      <p></p>
      <Chart data={data} />
      <Button onClick={() => dispatch(fetchPatientHistory())}>Load more</Button>
      <p></p>
      <PatientCard />
    </Container>
  );
}
