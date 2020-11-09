import { FETCH_DOCTOR_APPOINTMENTS_SUCCESS } from "./actions";
import { FETCH_DOCTOR_PATIENTS_SUCCESS } from "./actions";

const initialState = {
  appointments: [],
  patients: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCTOR_APPOINTMENTS_SUCCESS: {
      console.log(" fetched appointments in the reducer", action.payload);

      return {
        ...state,
        appointments: [...state.appointments, ...action.payload],
      };
    }
    case FETCH_DOCTOR_PATIENTS_SUCCESS: {
      console.log(" fetched patients in the reducer", action.payload);

      return {
        ...state,
        patients: [...state.patients, ...action.payload],
      };
    }
    default:
      return state;
  }
};
