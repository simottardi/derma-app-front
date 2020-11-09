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
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    <Container>
      <Container as={Col} md={{ span: 6, offset: 3 }} className="mt-2 mb-2 ">
        <h1 className="text-white">Doctor homepage </h1>
        <h5 className="text-white">
          Welcome back <strong> {name}</strong>
        </h5>
        <p className="text-white">
          Today is <strong>{today}</strong>
        </p>
        <p>Appointment list</p>
        {doctorAppointments.map((appointment) => {
          return (
            /* (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ); */
            <Card className={classes.root} key={appointment.id}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {appointment.name}
                </Typography>

                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Date and time: {appointment.datetime}, Id:{appointment.id},
                  Patient Id:{appointment.patientId},
                </Typography>
              </CardContent>
            </Card>
          );
        })}
        {isLoading ? (
          <em>Loading...</em>
        ) : (
          <Button onClick={() => dispatch(fetchDoctorAppointments())}>
            Load more
          </Button>
        )}
        <p>Patients</p>
        {doctorPatients.map((docPatient /* , i */) => {
          return (
            /*             <PatientCardForDoctor
              key={docPatient.id}
              docPatient={docPatient}
              divider={i !== doctorPatients.length - 1}
            /> 
             * https://stackoverflow.com/questions/61408004/render-method-component-bug-invalid-hook-call-hooks-can-only-be-called-inside *
            */

            <Card className={classes.root} key={docPatient.id}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {docPatient.name}
                </Typography>

                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Id:{docPatient.id}, Email:{docPatient.email}, Address:{" "}
                  {docPatient.address}
                </Typography>

                <CardActions>
                  <Link
                    to={`/doctor/patient/${docPatient.id}`}
                    className="text-white mb-2"
                  >
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </CardContent>
            </Card>
          );
        })}

        {isLoading ? (
          <em>Loading...</em>
        ) : (
          <Button onClick={() => dispatch(fetchDoctorPatients())}>
            Load more
          </Button>
        )}
      </Container>
    </Container>
  );
}
