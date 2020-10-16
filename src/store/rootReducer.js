import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import patientHistory from "./patientHistory/reducer";
import homepageDetails from "./homepageDetails/reducer";

export default combineReducers({
  appState,
  user,
  patientHistory,
  homepageDetails
});
