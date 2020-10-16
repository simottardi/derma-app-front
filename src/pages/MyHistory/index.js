import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToday } from "../../store/appState/selectors";
import Container from "react-bootstrap/Container";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  console.log("today", today )

  if (token === null) {
    console.log("token null")
    history.push("/");
  }

  return (
    <div>
{/* testing this is working */}
<h1> Patient history</h1>
<p> Today is { today}  </p>

    </div>

    
  );
}

 