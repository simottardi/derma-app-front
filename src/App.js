import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
/* import Navigation from "./components/Navigation"; */
import Navigation2 from "./components/Navigation2";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyHomepage from "./pages/MyHomepage";
import NewDay from "./pages/NewDay";
import MyHistory from "./pages/MyHistory";
import Homepages from "./pages/Homepages";
import LoginDoctor from "./pages/LoginDoctor";

import DoctorHomepage from "./pages/DoctorHomepage";
import DoctorPatient from "./pages/DoctorPatient";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { getDoctorWithStoredToken } from "./store/doctor/actions";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
require("dotenv");

//MATERIAL Ui

function App() {
  // console.log("WHAT IS ENV", process.env.API_URL);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDoctorWithStoredToken());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <Navigation /> */}
        <Navigation2 />
        <MessageBox />
        <Switch>
          {isLoading ? <Loading /> : null}
          <Route exact path="/" component={Homepages} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login/patient" component={Login} />
          <Route path="/login/doctor" component={LoginDoctor} />
          <Route path="/newday/" component={NewDay} />
          <Route path="/myhomepage/" component={MyHomepage} />
          <Route path="/myhistory/" component={MyHistory} />
          <Route path="/doctor/homepage" component={DoctorHomepage} />
          <Route path="/doctor/patient/:id" component={DoctorPatient} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
