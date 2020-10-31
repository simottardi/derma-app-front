import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectTokenDoctor /* selectdoctor  */ } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const DOCTOR_LOGIN_SUCCESS = "DOCTOR_LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const HOMEPAGE_UPDATED = "HOMEPAGE_UPDATED";
export const LOG_OUT_DOC = "LOG_OUT_DOC";

const loginSuccess = (doctorWithToken) => {
  return {
    type: DOCTOR_LOGIN_SUCCESS,
    payload: doctorWithToken,
  };
};

const tokenDoctorStillValid = (doctorWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: doctorWithoutToken,
});

export const logOutDoc = () => ({ type: LOG_OUT_DOC });

export const homepageUpdated = (homepage) => ({
  type: HOMEPAGE_UPDATED,
  payload: homepage,
});

//We do not want to have this functionality
/* export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
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
}; */

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      console.log("api url", apiUrl);

      const response = await axios.post(`${apiUrl}/login/doctor`, {
        email,
        password,
      });

      console.log("RESPONSE", response.data);

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
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

export const getDoctorWithStoredToken = () => {
  return async (dispatch, getState) => {
    // console.log("login with stored token")

    // get token from the state
    const tokenDoctor = selectTokenDoctor(getState());
    // console.log("stored token", token)
    // if we have no token, stop
    if (tokenDoctor === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/me/doctor`, {
        headers: { Authorization: `Bearer ${tokenDoctor}` },
      });

      // token is still valid
      dispatch(tokenDoctorStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      // console.log(error.response.message);

      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOutDoc());
      dispatch(appDoneLoading());
    }
  };
};
