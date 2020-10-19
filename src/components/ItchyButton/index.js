import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {selectPatientHistory} from "../../store/patientHistory/selectors"
import "./itchyButton.css"
import { updateMyDay } from "../../store/patientHistory/actions";


export default function ItchyButton(props) {
  const patientDays = useSelector(selectPatientHistory)
  const dayId = props.dayId 
  const dayScore = patientDays.filter(day => day.id===dayId)
  const itchScore = dayScore[0].itchScore 
  const date = dayScore[0].date 
  console.log("patientDays", patientDays)
  console.log("props", props, "dayId", dayId, "dayScore", dayScore, "itchScore", itchScore)
 const dispatch = useDispatch();

// const [setScore,useScore] = useState(state.patientHistory)
// console.log("Button state", useScore)
// console.log("props", props)



  return (
<div class="dropdown">
  <button class="dropbtn">How much itchiness today? <strong>{`${itchScore}`}</strong></button>
  <select 
   value={`${itchScore}`} //{SELECTED DATE} // itchiness score
   onChange={(event) => dispatch(updateMyDay(date, {itchScore:event.target.value})) &&  console.log(event.target.value)}
  class="dropdown-content"
    >
    <option >0</option>
    <option >1</option>
    <option >2</option>
    <option >3</option>
    <option >4</option>
    <option >5</option>   
  </select>
</div>
  );
}

// thinking of using the bootstrap button for an upgrade