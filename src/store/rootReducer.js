import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import patientHistory from "./patientHistory/reducer";
import doctor from "./doctor/reducer";
import doctorHomepage from "./doctorHomepage/reducer";

export default combineReducers({
  appState,
  user,
  patientHistory,
  doctor,
  doctorHomepage,
});
