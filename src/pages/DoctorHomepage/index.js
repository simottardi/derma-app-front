import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDoctor } from "../../store/doctor/selectors";
import { selectToday } from "../../store/appState/selectors";
import { useHistory, Link } from "react-router-dom";
import { fetchDoctorAppointments } from "../../store/doctorHomepage/actions";

import Container from "react-bootstrap/Container";
import { Col } from "react-bootstrap";

import { selectDoctorAppointments } from "../../store/doctorHomepage/selectors";

export default function MyHomepage() {
  const { tokenDoctor, name } = useSelector(selectDoctor);
  const doctorAppointments = useSelector(selectDoctorAppointments);
  const today = useSelector(selectToday);
  const history = useHistory();
  const dispatch = useDispatch();

  if (tokenDoctor === null) {
    history.push("/");
  }

  //PLAN
  //fetch appointment list
  // fetch patients last update
  //Display

  // const patientHistoryData = patientHistory.map((day) => {
  //   return { date: `${day.date}`, itchScore: `${day.itchScore}` };
  // });

  // const data = patientHistoryData.reverse();

  useEffect(() => {
    console.log("Use effect  --> fetch doctor appointments ");
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  console.log("doctorAppointments home", doctorAppointments);

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
            <div key={appointment.id}>
              <p>{appointment.id}</p>
              <p>appointment.datetime {appointment.datetime}</p>
              <p>appointment.patientId {appointment.patientId}</p>
            </div>
          );
        })}

        <p>Patients upadates</p>
        {/*        <Link to="/newday" className="text-white mb-2">
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
        </div> */}
      </Container>
    </Container>
  );
}
