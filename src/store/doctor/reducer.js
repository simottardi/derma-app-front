import {
  LOG_OUT_DOC,
  DOCTOR_LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
} from "./actions";

const initialState = {
  token: localStorage.getItem("tokenDoctor"),
  name: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DOCTOR_LOGIN_SUCCESS:
      console.log("reducer action", action);
      localStorage.setItem("tokenDoctor", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT_DOC:
      localStorage.removeItem("tokenDoctor");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
