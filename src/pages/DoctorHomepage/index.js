import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDoctor } from "../../store/doctor/selectors";
import { selectToday } from "../../store/appState/selectors";
import { useHistory, Link } from "react-router-dom";
import { fetchDoctorAppointments } from "../../store/doctorHomepage/actions";
/* import AppointmentCard from "../../components/AppointmentCard";
import PatientCardForDoctor from "../../components/PatientCardForDoctor"; */
import { fetchDoctorPatients } from "../../store/doctorHomepage/actions";

import Container from "react-bootstrap/Container";
import { /* Button, */ Col } from "react-bootstrap";
import { selectAppLoading } from "../../store/appState/selectors";

import {
  selectDoctorAppointments,
  selectDoctorPatients,
} from "../../store/doctorHomepage/selectors";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  CardActions,
  CardContent,
  Button,
  Typography,
  colors,
} from "@material-ui/core";
/* import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core"; */

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function MyHomepage() {
  const { token, name } = useSelector(selectDoctor);
  const doctorAppointments = useSelector(selectDoctorAppointments);
  const doctorPatients = useSelector(selectDoctorPatients);
  const today = useSelector(selectToday);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  if (token === null) {
    history.push("/");
  }

  // console.log("tokenDoctor:", token, name);

  useEffect(() => {
    console.log("Use effect  --> fetch doctor appointments ");
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  // console.log("doctorAppointments home", doctorAppointments);

  useEffect(() => {
    console.log("Use effect  --> fetch doctor patients");
    dispatch(fetchDoctorPatients());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <Container align="center" maxWidth="sm" fixed style={{ marginTop: 12 }}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ marginTop: 12 }}
      >
        <Typography
          variant="h5"
          justify="center"
          align="center"
          style={{ marginBottom: 12 }}
        >
          Doctor Homepage
        </Typography>
        <Typography
          variant="body"
          justify="center"
          align="center"
          style={{ marginBottom: 12 }}
        >
          Welcome back <strong> {name}</strong>
        </Typography>
        <Typography
          variant="body"
          justify="center"
          align="center"
          style={{ marginBottom: 12 }}
        >
          Today is <strong>{today}</strong>
        </Typography>
        <Card
          style={{
            paddingTop: 12,
            paddingBottom: 12,
            paddingRight: 12,
            paddingLeft: 12,
            backgroundColor: "#decbf5",
            marginTop: 6,
            marginBottom: 12,
          }}
        >
          {" "}
          <Typography
            variant="h6"
            justify="left"
            align="left"
            style={{ marginBottom: 12, MarginTop: 6 }}
          >
            Appointment list
          </Typography>
          {doctorAppointments.map((appointment) => {
            return (
              <Card
                className={classes.root}
                key={appointment.id}
                style={{
                  marginBottom: 12,
                  paddingTop: 0,
                  paddingBottom: 0,
                  backgroundColor: "#c09deb",
                }}
              >
                <CardContent
                  style={{
                    paddingBottom: 3,
                  }}
                >
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Date and time: {appointment.datetime},
                    <br />
                    Patient Id:{appointment.patientId}, <br />
                    Id:{appointment.id},
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Card>
        {isLoading ? (
          <Typography
            variant="h5"
            justify="left"
            align="left"
            style={{ marginBottom: 12, MarginTop: 6 }}
          >
            Loading ...
          </Typography>
        ) : (
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: 15 }}
            onClick={() => dispatch(fetchDoctorAppointments())}
          >
            Load more
          </Button>
        )}

        <Card
          fullWidt
          style={{
            paddingTop: 12,
            paddingBottom: 12,
            paddingRight: 12,
            paddingLeft: 12,
            backgroundColor: "#decbf5",
            marginTop: 6,
            marginBottom: 12,
          }}
        >
          {" "}
          <Typography
            variant="h6"
            justify="left"
            align="left"
            style={{ marginBottom: 12, MarginTop: 6 }}
          >
            Patient List
          </Typography>
          {doctorPatients.map((docPatient /* , i */) => {
            return (
              <Card
                className={classes.root}
                key={docPatient.id}
                style={{
                  marginBottom: 12,
                  paddingTop: 0,
                  paddingBottom: 0,
                  backgroundColor: "#c09deb",
                }}
              >
                <CardContent
                  style={{
                    paddingBottom: 0,
                  }}
                >
                  <CardActions>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="baseline"
                    >
                      <Typography variant="h5" component="h2" align="left">
                        {docPatient.name}
                      </Typography>
                      <Link
                        to={`/doctor/patient/${docPatient.id}`}
                        className="text-white mb-2"
                      >
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                        >
                          Learn More
                        </Button>
                      </Link>
                    </Grid>
                  </CardActions>

                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Id:{docPatient.id}, Email:{docPatient.email}, Address:{" "}
                    {docPatient.address}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Card>
        {isLoading ? (
          <Typography
            variant="h5"
            justify="left"
            align="left"
            style={{ marginBottom: 12, MarginTop: 6 }}
          >
            Loading ...
          </Typography>
        ) : (
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: 15 }}
            onClick={() => dispatch(fetchDoctorAppointments())}
          >
            Load more
          </Button>
        )}
      </Grid>
    </Container>
  );
}
