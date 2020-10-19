import { apiUrl, DEFAULT_PAGINATION_LIMIT  } from "../../config/constants";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
/*   setMessage */
} from "../appState/actions";


export const FETCH_PATIENTHISTORY_SUCCESS = "FETCH_PATIENTHISTORY_SUCCESS";
export const MYDAY_UPDATED = "MYDAY_UPDATED";


export const fetchPatientHistorySuccess = moreDays => ({
  type: FETCH_PATIENTHISTORY_SUCCESS,
  payload: moreDays
});

 export const myDayUpdated = day => ({
   type: MYDAY_UPDATED,
   payload: day
 });

export const fetchPatientHistory = () => {
  return async (dispatch, getState) => {
   const patientsHistoryCount = getState().patientHistory.length;
  const id = getState().user.id;
  // console.log("action fetch PH", "id", id, "offset", patientsHistoryCount )
    const response = await axios.get(
      // `${apiUrl}/homepages?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${homepagesCount}`
          `${apiUrl}/patient/${id}/history?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${patientsHistoryCount}` //homepages?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${homepagesCount}
    );

    // console.log("patient history", response.data);
    const moreDays = response.data.patientArrayDays;
    dispatch(fetchPatientHistorySuccess(moreDays));
  };
};

export const updateMyDay = ( date, data ) => {
  return async (dispatch, getState) => {
        // const {token } = selectUser(getState());
    console.log('Data', data)
    dispatch(appLoading());
    const id = getState().user.id;
    const reqDate = date

    const response = await axios.patch (
      `${apiUrl}/patient/${id}/daybydate`,
      {
       date:reqDate,
       data
      }
    );
     console.log(response);
    dispatch(myDayUpdated(response.data.updateDay));
    dispatch(
      showMessageWithTimeout("success", false, "update successfull", 3000)
    );
    dispatch(appDoneLoading());
  };
};

