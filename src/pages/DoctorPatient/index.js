import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Button } from "react-bootstrap";

import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import { fetchDoctorPatientHistory } from "../../store/patientHistory/actions";
import { selectPatientHistory } from "../../store/patientHistory/selectors";

import { selectAppLoading } from "../../store/appState/selectors";
import ItchyButton from "../../components/ItchyButton";
import { selectDoctor } from "../../store/doctor/selectors";

export default function MyHistory() {
  const { token } = useSelector(selectDoctor);
  const patientHistory = useSelector(selectPatientHistory);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const patientId = useParams();
  const id = patientId.id;
  // console.log("today", today )
  // console.log("patient history from selector", patientHistory )
  //console.log("token", token)
  //console.log("patient id", patientId);

  if (token === null) {
    console.log("token null");
    history.push("/");
  }

  useEffect(() => {
    console.log("Use effect  --> fetch doctor patient history dispatched ");
    dispatch(fetchDoctorPatientHistory(id));
  }, [dispatch, id]);

  return (
    <Container as={Col} md={{ span: 6, offset: 3 }} className="mt-2">
      <h1 className="text-white"> Patient history</h1>
      {isLoading ? (
        <em>Loading...</em>
      ) : (
        <Button
          onClick={() => dispatch(fetchDoctorPatientHistory(patientId.id))}
        >
          Load more days
        </Button>
      )}

      {patientHistory.map((day) => {
        return <ItchyButton key={day.id} day={day} />;
      })}
      {isLoading ? (
        <em>Loading...</em>
      ) : (
        <Button
          onClick={() => dispatch(fetchDoctorPatientHistory(patientId.id))}
        >
          Load more days
        </Button>
      )}
    </Container>
  );
}
