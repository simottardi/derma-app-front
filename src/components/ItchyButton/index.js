import React, {useState} from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./itchyButton.css"
import { updateMyDay } from "../../store/patientHistory/actions";




export default function ItchyButton(props) {
  // const patientDays = useSelector(selectPatientHistory)
  const dispatch = useDispatch();
  // const day=props
  console.log("props", props)
  // const dayId = props.dayId 
  // const dayScore = patientDays.filter(day => day.id===dayId)
  const [score, setScore] = useState(props.day.itchScore|| 0);
  const [date, setDayDate] = useState(props.day.date/* || "" */);
  const [note, setDayNote] = useState(props.day.note|| "");
  const [image, setDayImage] = useState(props.day.image|| "");
  const [medicationMorning, setDayMedicationMorning] = useState(props.day.medicationMorning|| false);
  const [medicationAfternoon, setDayMedicationAfternoon] = useState(props.day.medicationAfternoon|| false);
  const [medicationEvening, setDayMedicationEvening] = useState(props.day.medicationEvening|| false);

   function submitForm(event) {
    event.preventDefault();

    console.log(score, date, note, image, medicationMorning, medicationAfternoon, medicationEvening);
    dispatch(updateMyDay(date, {itchScore:score, note:note, medicationAfternoon:medicationAfternoon,
       medicationEvening:medicationEvening, medicationMorning:medicationMorning, image:image  })); // scorre misstyped on purpose
  }
 
  // console.log("patientDays", patientDays)
  // console.log("props", props, "dayId", dayId, "dayScore", dayScore, "itchScore", itchScore)
 // const [setScore,useScore] = useState(state.patientHistory)
// console.log("Button state", useScore)
// console.log("props", props)



  return (
    <Form key={props.day.id}>
      <h1 className="mt-5 mb-5">Edit your day {`${date}`}</h1>
      <Form.Group>
<div class="dropdown">
  <button class="dropbtn">How much itchiness today? <strong>{`${score}`}</strong></button>
  <select 
   value={`${score}`} //{SELECTED DATE} // itchiness score
  onChange={(event) => setScore(event.target.value) && console.log(event.target.value)}
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
      </Form.Group>
<Form.Group>
        <Form.Label>Note</Form.Label>
        <Form.Control
          value={note}
          onChange={event => setDayNote(event.target.value) && console.log("note", note)}
          type="text"
          placeholder={`${note}` || "What is your note for the day?"}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image</Form.Label>
        <Form.Control
          value={image}
          onChange={event => setDayImage(event.target.value) && console.log("image url", image)}
          type="text"
          placeholder={`${image}` || "Upload an image for this day"}
        />
      </Form.Group>
 
<Form.Group class="form-check-inline">

  <Form.Label class="form-check-label">Morning medication <Form.Control
  class="form-check-input"
          value={props.day.medicationMorning}
          onChange={event => setDayMedicationMorning(event.target.value)}
          type="checkbox"
          placeholder={`${props.day.medicationMorning}` || "Upload an image for this day"}
          /* checked={`${props.day.medicationMorning}`} */
          undetermined
          onCheckboxChange={event => setDayMedicationMorning(event.target.value)}
        /></Form.Label>
{/* </Form.Group>

<Form.Group> */}
  <Form.Label class="form-check-label">Afternoon medication <Form.Control
  class="form-check-input"
          value={props.day.medicationAfternoon}
          onChange={event => setDayMedicationAfternoon(event.target.value)}
          type="checkbox"
          isSelected={props.day.medicationAfternoon}
    onCheckboxChange={setDayMedicationAfternoon}
        /></Form.Label>
{/* </Form.Group>

<Form.Group> */}
  <Form.Label class="form-check-label">Evening medication <Form.Control
  class="form-check-input"
label= "Evening medication"
          value={props.day.medicationEvening}
          onChange={event => setDayMedicationEvening(event.target.value)}
          type="checkbox"
          placeholder={`${props.day.medicationMorning}` || "Upload an image for this day"}
        /></Form.Label>
</Form.Group>

            <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitForm}>
          Save changes
        </Button>
      </Form.Group>
    </Form>

  );
}

/*
{day.medicationMorning === true ? (
              <p>
                Uncheck medication #{day.id}
                <input
                  type="checkbox"
                  checked
                  onClick={(event) => {
                    console.log("check this medication as false", day.id);
                    // dispatch(patchUserBlock(day.id));
                  }}
                ></input>
              </p>
            ) : (
              <p>
                Check medication #{day.id}
                <input
                  type="checkbox"
                  onClick={(event) => {
                    console.log("check this medication as true", day.id);
                    // dispatch(patchUserBlock(day.id));
                  }}
                ></input>
              </p>
                          )}
                          */