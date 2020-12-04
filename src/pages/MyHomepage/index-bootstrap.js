import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToday } from "../../store/appState/selectors";
import { useHistory, Link } from "react-router-dom";
import { fetchPatientHistory } from "../../store/patientHistory/actions";

import Container from "react-bootstrap/Container";
import { Col } from "react-bootstrap";
import PatientCard from "../../components/PatientCard";
import Chart from "../../components/Chart";
import { selectPatientHistory } from "../../store/patientHistory/selectors";

export default function MyHomepage() {
  const { token, name } = useSelector(selectUser);
  const patientHistory = useSelector(selectPatientHistory);
  const today = useSelector(selectToday);
  const history = useHistory();
  const dispatch = useDispatch();

  if (token === null) {
    history.push("/");
  }

  useEffect(() => {
    //console.log("Use effect  --> fetch patient history dispatched ")
    dispatch(fetchPatientHistory());
  }, [dispatch]);

  const patientHistoryData = patientHistory.map((day) => {
    return { date: `${day.date}`, itchScore: `${day.itchScore}` };
  });

  const data = patientHistoryData.reverse();

  return (
    <Container>
      <Container as={Col} md={{ span: 6, offset: 3 }} className="mt-2 mb-2 ">
        <h1 className="text-white">Patient homepage </h1>
        <h5 className="text-white">
          Welcome back <strong> {name}</strong>
        </h5>
        <p className="text-white">
          Today is <strong>{today}</strong>
        </p>
        <Link to="/newday" className="text-white mb-2">
          <button
            type="button"
            className="mb-2 btn btn-lg btn-block btn-outline-light"
          >
            Click here to create a new day in your journal.
          </button>
        </Link>
        <PatientCard />
      </Container>
      <Container>
        <div className="container mb-2">
          <div className="card-deck text-center">
            <div className="card shadow-sm">
              <div className="card-header">
                <h4 className="font-weight-normal ">Your Eczema Chart</h4>
              </div>
              <div className="card-body">
                <Chart data={data} />

                <button
                  type="button"
                  onClick={() => dispatch(fetchPatientHistory())}
                  className="btn btn-lg btn-block btn-outline-primary"
                >
                  Load more
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
}
