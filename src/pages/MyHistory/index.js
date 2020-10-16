import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToday } from "../../store/appState/selectors";
import Container from "react-bootstrap/Container";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";
import { fetchPatientHistory } from "../../store/patientHistory/actions";
import { selectPatientHistory } from "../../store/patientHistory/selectors";


/* import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MyHomepageForm from "./MyHomepageForm";
import StoryForm from "./StoryForm";
import Homepage from "../../components/Homepage";
import StoryCarousel from "../../components/StoryCarousel";
import ItchyButton from "../../components/ItchyButton";
 */

 // PLAN
// [x]set Date
// fetch history
// fetch current day // what if there is no day? --> creat one
// display the patient info 
// send requests to update their day


export default function MyHistory() {
  const { token/* , homepage, name,email, id, doctorId, address, createdAt  */} = useSelector(selectUser);
  const today = useSelector(selectToday)
  const patientHistory = useSelector(selectPatientHistory)
  const history = useHistory();
   const dispatch = useDispatch();

  console.log("today", today )
  console.log("patient history from selector", patientHistory )

  if (token === null) {
    console.log("token null")
    history.push("/");
  }

    useEffect(() => {
      console.log("fetch patient history dispatched")
    dispatch(fetchPatientHistory());
  }, [dispatch]);

  return (
    <div>
{/* testing this is working */}
<h1> Patient history</h1>
<p> Today is { today}  </p>
{/* THE PATIENT DAYS WILL BE DISPLAYED HERE */}
    </div>

    
  );
}

 