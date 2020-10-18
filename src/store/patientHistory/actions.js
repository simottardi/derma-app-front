import { apiUrl, DEFAULT_PAGINATION_LIMIT  } from "../../config/constants";
import axios from "axios";



export const FETCH_PATIENTHISTORY_SUCCESS = "FETCH_PATIENTHISTORY_SUCCESS";

export const fetchPatientHistorySuccess = moreDays => ({
  type: FETCH_PATIENTHISTORY_SUCCESS,
  payload: moreDays
});

export const fetchPatientHistory = () => {
  return async (dispatch, getState) => {
   const patientsHistoryCount = getState().patientHistory.length;
  const id = getState().user.id;
  console.log("action fetch PH", "id", id, "offset", patientsHistoryCount )
    const response = await axios.get(
      // `${apiUrl}/homepages?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${homepagesCount}`
          `${apiUrl}/patient/${id}/history?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${patientsHistoryCount}` //homepages?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${homepagesCount}
    );

    console.log("patient history", response.data);
    const moreDays = response.data.patientArrayDays;
    dispatch(fetchPatientHistorySuccess(moreDays));
  };
};

