import { apiUrl, DEFAULT_PAGINATION_LIMIT  } from "../../config/constants";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
 setMessage 
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
      try{
   const patientsHistoryCount = getState().patientHistory.length;
    const id = getState().user.id;
    console.log("id", id)
    const response = await axios.get(
          `${apiUrl}/patient/${id}/history?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${patientsHistoryCount}` 
    )


    // console.log("patient history", response.data);
    const moreDays = response.data.patientArrayDays;
    dispatch(fetchPatientHistorySuccess(moreDays));
  
        } catch (e) {
    console.log(e.message);
  };
}};

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

export const createMyDay = ( date, data ) => {
  console.log("createMyDay was dispatched", date, data)
 
return async (dispatch, getState) => {
        // const {token } = selectUser(getState());
    // console.log('Data', data)
    dispatch(appLoading());
     try{
    const id = getState().user.id;
    const reqDate = date
    const response = await axios.post (
      `${apiUrl}/patient/${id}/daybydate`,
      {
       date:reqDate,
       data
      }
    );
    console.log(response);
    // dispatch(myDayUpdated(response.data.updateDay));
    dispatch(
      showMessageWithTimeout("success", false, "update successfull", 3000)
    );
    dispatch(appDoneLoading());
    }
         catch (error) {
 if (error.response) {
        // console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        // console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
  }}};