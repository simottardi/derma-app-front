import { apiUrl, DEFAULT_PAGINATION_LIMIT  } from "../../config/constants";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";


export const FETCH_PATIENTHISTORY_SUCCESS = "FETCH_PATIENTHISTORY_SUCCESS";

export const fetchPatientHistorySuccess = moreDays => ({
  type: FETCH_PATIENTHISTORY_SUCCESS,
  payload: moreDays
});

// export const myDayUpdated = day => ({
//   type: MYDAY_UPDATED,
//   payload: day
// });

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

export const updateMyDay = ( date, data ) => {
  return async (dispatch, getState) => {
        // const {token } = selectUser(getState());
    console.log('Data', data)
    dispatch(appLoading());
    const id = getState().user.id;

    const response = await axios.patch (
      `${apiUrl}/patient/${id}/daybydate`,
      {
       
        data
      }
      // {
      //   itchScore,
      //  medicationAfternoon,
      //  medicationEvening,
      //  medicationMorning,
      //  note,
      //  image 
            // },
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // }
    );
     console.log(response);
     //dispactch action creator

    dispatch(
      showMessageWithTimeout("success", false, "update successfull", 3000)
    );
    // dispatch(myDayUpdated(response.data.homepage));
    dispatch(appDoneLoading());
  };
};

