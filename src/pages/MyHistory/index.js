import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Button } from "react-bootstrap";
import { selectUser } from "../../store/user/selectors";
import { selectToday } from "../../store/appState/selectors";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import { fetchPatientHistory } from "../../store/patientHistory/actions";
import { selectPatientHistory } from "../../store/patientHistory/selectors";

import { selectAppLoading } from "../../store/appState/selectors";
import ItchyButton from "../../components/ItchyButton";

export default function MyHistory() {
  const { token } = useSelector(selectUser);
  const today = useSelector(selectToday);
  const patientHistory = useSelector(selectPatientHistory);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  // console.log("today", today )
  // console.log("patient history from selector", patientHistory )

  if (token === null) {
    console.log("token null");
    history.push("/");
  }

  useEffect(() => {
    console.log("Use effect  --> fetch patient history dispatched ");
    dispatch(fetchPatientHistory());
  }, [dispatch]);

  return (
    <Container as={Col} md={{ span: 6, offset: 3 }} className="mt-2">
      <h1 className="text-white"> Patient history</h1>
      <p className="text-white"> Welcome to your journal!</p>
      <p className="text-white">
        Today is <strong>{today}</strong>
      </p>
      <Link to="/newday" className="text-white">
        <button
          type="button"
          className="btn btn-lg btn-block btn-outline-light"
        >
          Click here to create a new day in your journal.
        </button>
      </Link>

      {patientHistory.map((day) => {
        return <ItchyButton key={day.id} day={day} />;
      })}
      {isLoading ? (
        <em>Loading...</em>
      ) : (
        <Button onClick={() => dispatch(fetchPatientHistory())}>
          Load more
        </Button>
      )}
    </Container>
  );
}