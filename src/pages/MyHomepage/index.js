import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToday } from "../../store/appState/selectors";
import { useHistory, Link } from "react-router-dom";
import { fetchPatientHistory } from "../../store/patientHistory/actions";

/* import Container from "react-bootstrap/Container"; */
import { Col } from "react-bootstrap";
import PatientCard from "../../components/PatientCard";
import Chart from "../../components/Chart";
import { selectPatientHistory } from "../../store/patientHistory/selectors";

import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  Grid,
  CardActions,
  CardContent,
  Button,
  Typography,
  colors,
} from "@material-ui/core";

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
    <Container align="center" maxWidth="sm" fixed style={{ marginTop: 12 }}>
      {/*     //  <Container as={Col} md={{ span: 6, offset: 3 }} className="mt-2 mb-2 "> */}
      <Container>
        <Typography
          variant="h5"
          justify="center"
          align="center"
          style={{ marginBottom: 12 }}
        >
          Patient homepage
        </Typography>
        {/*         <h1 className="text-white">Patient homepage </h1> */}
        {/* <h5 className="text-white">
          Welcome back <strong> {name}</strong>
        </h5>
        <p className="text-white">
          Today is <strong>{today}</strong>
        </p> */}
        <Typography
          variant="body"
          justify="center"
          align="center"
          style={{ marginBottom: 12 }}
        >
          Welcome back <strong> {name}</strong>
        </Typography>
        <br></br>
        <Typography
          variant="body"
          justify="center"
          align="center"
          style={{ marginBottom: 12 }}
        >
          Today is <strong>{today}</strong>
        </Typography>
        {/*     <Link to="/newday" className="text-white mb-2">
          <button
            type="button"
            className="mb-2 btn btn-lg btn-block btn-outline-light"
          >
            Click here to create a new day in your journal.
          </button>
        </Link> */}
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ marginTop: 12, marginBottom: 12 }}
        >
          <Link
            to="/newday"
            className="text-white mb-2"
            style={{ textDecoration: "none" }}
          >
            <Button size="small" variant="contained" color="primary">
              Create a new day in your journal
            </Button>
          </Link>
        </Grid>
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
