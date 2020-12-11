import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectUser } from "../../store/user/selectors";
import { selectToday } from "../../store/appState/selectors";

import { useHistory } from "react-router-dom";
import { fetchPatientHistory } from "../../store/patientHistory/actions";
import { selectPatientHistory } from "../../store/patientHistory/selectors";
import Chart from "../../components/Chart";

import { selectAppLoading } from "../../store/appState/selectors";
import ItchyButton from "../../components/ItchyButton";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  loginButtonTextStyle: {
    color: "white",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  body1: {
    padding: theme.spacing(2),
  },
}));

export default function MyHistory() {
  const { token } = useSelector(selectUser);
  const today = useSelector(selectToday);
  const patientHistory = useSelector(selectPatientHistory);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  if (token === null) {
    console.log("token null");
    history.push("/");
  }

  useEffect(() => {
    console.log("Use effect  --> fetch patient history dispatched ");
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
    <Container>
      <Container>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ marginTop: 12, marginBottom: 12 }}
        >
          {" "}
          <Typography
            variant="h5"
            justify="center"
            align="center"
            style={{ marginBottom: 12 }}
          >
            Patient homepage
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
          <Link
            to="/newday"
            className="text-white mb-2"
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary">
              Create a new day in your journal
            </Button>
          </Link>
          <Chart data={data} />
          <Button
            style={{
              maxWidth: "150px",
              maxHeight: "30px",
              minWidth: "150px",
              minHeight: "30px",
            }}
            variant="contained"
            allign="center"
            justify="center"
            color="primary"
            onClick={() => dispatch(fetchPatientHistory())}
          >
            Load more
          </Button>
        </Grid>
      </Container>
      <Grid container spacing="2">
        {patientHistory.map((day) => {
          return (
            <Grid item xs={12} sm={4}>
              <ItchyButton key={day.id} day={day} />
            </Grid>
          );
        })}
      </Grid>
      {isLoading ? (
        <em>Loading...</em>
      ) : (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ marginTop: 12, marginBottom: 12 }}
        >
          <Button
            style={{
              marginTop: 12,
              marginBottom: 12,
              maxWidth: "150px",
              maxHeight: "30px",
              minWidth: "150px",
              minHeight: "30px",
            }}
            variant="contained"
            allign="center"
            justify="center"
            color="primary"
            onClick={() => dispatch(fetchPatientHistory())}
          >
            Load more
          </Button>
        </Grid>
      )}
    </Container>
  );
}
