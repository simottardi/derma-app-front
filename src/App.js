import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyHomepage from "./pages/MyHomepage";
import NewDay from "./pages/NewDay";
import MyHistory from "./pages/MyHistory";
import Homepages from "./pages/Homepages";
import LoginDoctor from "./pages/LoginDoctor";
import Footer from "./components/Footer";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

require("dotenv");

function App() {
  // console.log("WHAT IS ENV", process.env.API_URL);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
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
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
