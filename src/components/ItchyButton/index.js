import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./itchyButton.css";
import { updateMyDay } from "../../store/patientHistory/actions";

export default function ItchyButton(props) {
  // const patientDays = useSelector(selectPatientHistory)
  const dispatch = useDispatch();
  // const day=props
  // console.log("props", props)
  // const dayId = props.dayId
  // const dayScore = patientDays.filter(day => day.id===dayId)
  const [score, setScore] = useState(props.day.itchScore || 0);
  const date = props.day.date;
  const [note, setDayNote] = useState(props.day.note || "");
  const [image, setDayImage] = useState(props.day.image || "");
  const [medicationMorning, setDayMedicationMorning] = useState(
    props.day.medicationMorning
  );
  const [medicationAfternoon, setDayMedicationAfternoon] = useState(
    props.day.medicationAfternoon
  );
  const [medicationEvening, setDayMedicationEvening] = useState(
    props.day.medicationEvening
  );

  function submitForm(event) {
    event.preventDefault();

    console.log(
      score,
      date,
      note,
      image,
      medicationMorning,
      medicationAfternoon,
      medicationEvening
    );
    dispatch(
      updateMyDay(date, {
        itchScore: score,
        note: note,
        medicationAfternoon: medicationAfternoon,
        medicationEvening: medicationEvening,
        medicationMorning: medicationMorning,
        image: image,
      })
    ); // scorre misstyped on purpose
  }

  // console.log("patientDays", patientDays)
  // console.log("props", props, "dayId", dayId, "dayScore", dayScore, "itchScore", itchScore)
  // const [setScore,useScore] = useState(state.patientHistory)
  // console.log("Button state", useScore)
  // console.log("props", props)

  //  console.log("med mor", medicationMorning)
  //   console.log("med aft", medicationAfternoon)
  //    console.log("med eve", medicationEvening)
  return (
    <Form key={props.day.id}>
      <h1 className="mt-5 mb-5">Edit your day {`${date}`}</h1>
      <Form.Group>
        <div className="dropdown">
          <button className="dropbtn">
            How much itchiness today? <strong>{`${score}`}</strong>
          </button>
          <select
            value={`${score}`} //{SELECTED DATE} // itchiness score
            onChange={(event) =>
              setScore(event.target.value) && console.log(event.target.value)
            }
            className="dropdown-content"
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>Note</Form.Label>
        <Form.Control
          value={note}
          onChange={(event) =>
            setDayNote(event.target.value) && console.log("note", note)
          }
          type="text"
          placeholder={`${note}` || "What is your note for the day?"}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image</Form.Label>
        <Form.Control
          value={image}
          onChange={(event) =>
            setDayImage(event.target.value) && console.log("image url", image)
          }
          type="text"
          placeholder={`${image}` || "Upload an image for this day"}
        />
      </Form.Group>
      <Form.Group className="form-check-inline">
        <Form.Label className="form-check-label">
          Morning medication{" "}
          <Form.Control
            className="form-check-input"
            value={medicationMorning}
            onClick={(event) => setDayMedicationMorning(!medicationMorning)}
            type="checkbox"
            defaultChecked={medicationMorning}
          />
        </Form.Label>

        <Form.Label className="form-check-label">
          Afternoon medication{" "}
          <Form.Control
            className="form-check-input"
            value={medicationAfternoon}
            onClick={(event) => setDayMedicationAfternoon(!medicationAfternoon)}
            type="checkbox"
            defaultChecked={medicationAfternoon}
          />
        </Form.Label>

        <Form.Label className="form-check-label">
          Evening medication{" "}
          <Form.Control
            className="form-check-input"
            label="Evening medication"
            value={medicationEvening}
            onClick={(event) => setDayMedicationEvening(!medicationEvening)}
            type="checkbox"
            defaultChecked={medicationEvening}
          />
        </Form.Label>
      </Form.Group>

      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitForm}>
          Save changes
        </Button>
      </Form.Group>
    </Form>
  );
}
