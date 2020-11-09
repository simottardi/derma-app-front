import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import { selectTokenDoctor } from "../doctor/selectors";

import axios from "axios";
import { showMessageWithTimeout, setMessage } from "../appState/actions";

export const FETCH_DOCTOR_APPOINTMENTS_SUCCESS =
  "FETCH_DOCTOR_APPOINTMENTS_SUCCESS";

export const FETCH_DOCTOR_PATIENTS_SUCCESS = "FETCH_DOCTOR_PATIENTS _SUCCESS";

export const fetchDoctorAppointmentsSuccess = (appointmentsArray) => ({
  type: FETCH_DOCTOR_APPOINTMENTS_SUCCESS,
  payload: appointmentsArray,
});

export const fetchDoctorPatientsSuccess = (patientsArray) => ({
  type: FETCH_DOCTOR_PATIENTS_SUCCESS,
  payload: patientsArray,
});

export const fetchDoctorAppointments = () => {
  return async (dispatch, getState) => {
    const token = selectTokenDoctor(getState());
    const id = getState().user.id;
    if (token === null || id === undefined) return;

    try {
      const doctorAppoinmentsCount = getState().doctorHomepage.appointments
        .length;

      console.log("id", id, "doctorAppoinmentsCount", doctorAppoinmentsCount);
      const response = await axios.get(
        `${apiUrl}/doctors/${id}/appointments?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${doctorAppoinmentsCount}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("doctors appointments", response.data);
      const appointmentsArray = response.data.appointments;
      dispatch(fetchDoctorAppointmentsSuccess(appointmentsArray));
      dispatch(
        showMessageWithTimeout("success", true, "your request was successful")
      );
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        // console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        // console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
};

export const fetchDoctorPatients = () => {
  return async (dispatch, getState) => {
    const token = selectTokenDoctor(getState());
    const id = getState().user.id;
    if (token === null || id === undefined) return;

    try {
      const doctorPatientsCount = getState().doctorHomepage.patients.length;

      console.log("id", id);
      const response = await axios.get(
        `${apiUrl}/doctors/${id}/patients?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${doctorPatientsCount}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("doctors patients", response.data);
      const patientsArray = response.data.patients;
      console.log("patients data action", patientsArray);
      dispatch(fetchDoctorPatientsSuccess(patientsArray));
      dispatch(
        showMessageWithTimeout("success", true, "your request was successful")
      );
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        // console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        // console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
};
