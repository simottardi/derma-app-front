import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyHomepage from "./pages/MyHomepage";
import Homepages from "./pages/Homepages";
import HomepageDetails from "./pages/HomepageDetails";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

require("dotenv")



function App() {

  console.log("WHAT IS ENV", process.env.API_URL);

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
        <Route path="/login" component={Login} />
        <Route path="/myhomepage" component={MyHomepage} />
        <Route path="/homepages/:id" component={HomepageDetails} />
      </Switch>
    </div>
  );
}

export default App;


          //  <Button > login patient </Button>
        //  <Button > login doctor </Button>
        //  <Button > patient signup </Button>


//   const Button = styled.button`
//   /* Adapt the colors based on primary prop */
//   background: ${props => props.primary ? "palevioletred" : "white"};
//   color: ${props => props.primary ? "white" : "palevioletred"};
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;