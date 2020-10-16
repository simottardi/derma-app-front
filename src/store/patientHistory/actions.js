import { apiUrl, /* DEFAULT_PAGINATION_LIMIT */ } from "../../config/constants";
import axios from "axios";

export const FETCH_PATIENTHISTORY_SUCCESS = "FETCH_PATIENTHISTORY_SUCCESS";

export const fetchPatientHistorySuccess = patientHistory => ({
  type: FETCH_PATIENTHISTORY_SUCCESS,
  payload: patientHistory
});

export const fetchPatientHistory = () => {
  return async (dispatch, getState) => {
    // const homepagesCount = getState().homepages.length;
    const response = await axios.get(
      // `${apiUrl}/homepages?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${homepagesCount}`
          `${apiUrl}/patient/1/history` //homepages?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${homepagesCount}
    );

    console.log("patient history", response.data, "second response", response.data.patientArrayDays.patientDays);
    dispatch(fetchPatientHistorySuccess(response.data.patientArrayDays.patientDays));
  };
};

