import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import { selectTokenDoctor } from "../doctor/selectors";
import { selectToken } from "../user/selectors";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const FETCH_DOCTOR_APPOINTMENTS_SUCCESS =
  "FETCH_DOCTOR_APPOINTMENTS_SUCCESS";
export const MYDAY_UPDATED = "MYDAY_UPDATED";
export const MYDAY_CREATED = "MYDAY_CREATED";

export const fetchDoctorAppointmentsSuccess = (appointmentsArray) => ({
  type: FETCH_DOCTOR_APPOINTMENTS_SUCCESS,
  payload: appointmentsArray,
});

export const myDayUpdated = (day) => ({
  type: MYDAY_UPDATED,
  payload: day,
});

export const myDayCreated = (day) => ({
  type: MYDAY_CREATED,
  payload: day,
});

export const fetchDoctorAppointments = () => {
  return async (dispatch, getState) => {
    const token = selectTokenDoctor(getState());
    const id = getState().user.id;
    if (token === null || id === undefined) return;

    try {
      // const doctorAppoinmentsCount = getState().doctorAppointments.length;

      console.log("id", id);
      const response = await axios.get(
        `${apiUrl}/doctors/${id}/appointments?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${0}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("doctors appointments", response.data);
      const appointmentsArray = response.data.appointments;
      dispatch(fetchDoctorAppointmentsSuccess(appointmentsArray));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const updateMyDay = (date, data) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    console.log("Data", data);
    dispatch(appLoading());
    try {
      const id = getState().user.id;
      const reqDate = date;
      const response = await axios.patch(
        `${apiUrl}/patients/${id}/patientdays`,
        {
          date: reqDate,
          data,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      dispatch(myDayUpdated(response.data.updateDay));
      dispatch(
        showMessageWithTimeout("success", false, "update successfull", 3000)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        // console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const createMyDay = (date, data) => {
  console.log("createMyDay was dispatched", date, data);

  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    // const {token } = selectUser(getState());
    // console.log('Data', data)
    dispatch(appLoading());
    try {
      const id = getState().user.id;
      const reqDate = date;
      const response = await axios.post(
        `${apiUrl}/patients/${id}/patientdays`,
        {
          date: reqDate,
          data,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("log day created", response.data.newDay);
      dispatch(myDayCreated(response.data.newDay));
      // dispatch(myDayUpdated(response.data.updateDay));
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Day successfully created",
          3000
        )
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        // console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
