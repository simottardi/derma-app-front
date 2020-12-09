import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToday } from "../../store/appState/selectors";
import { useHistory, Link } from "react-router-dom";
import { fetchPatientHistory } from "../../store/patientHistory/actions";

import PatientCard from "../../components/PatientCard";
import Chart from "../../components/Chart";
import { selectPatientHistory } from "../../store/patientHistory/selectors";

import { Container, Grid, Button, Typography } from "@material-ui/core";

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
    //Changing the date content to do not show the year
    const dateString = day.date;
    const myDateSplit = dateString.split("-");
    const myDate = myDateSplit[1] + "-" + myDateSplit[2];
    console.log("myDateElements", myDate);

    return { date: `${myDate}`, itchScore: `${day.itchScore}` };
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
            <Button variant="contained" color="primary">
              Create a new day in your journal
            </Button>
          </Link>
        </Grid>
        <PatientCard />
      </Container>

      <Container>
        <Chart data={data} />

        <Button
          style={{ marginTop: 12, marginBottom: 12 }}
          variant="contained"
          color="primary"
          onClick={() => dispatch(fetchPatientHistory())}
        >
          Load more days
        </Button>
      </Container>
    </Container>
  );
}
