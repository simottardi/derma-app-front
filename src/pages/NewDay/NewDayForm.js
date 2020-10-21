import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { selectToken, selectUser } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./itchyButton.css";
import { selectToday } from "../../store/appState/selectors";
import { createMyDay } from "../../store/patientHistory/actions";

export default function NewDayForm() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const today = useSelector(selectToday);
  const history = useHistory();

  const [score, setScore] = useState(0);
  const [date, setDayDate] = useState(today);
  const [note, setDayNote] = useState("");
  const [image, setDayImage] = useState("");
  const [medicationMorning, setDayMedicationMorning] = useState(false);
  const [medicationAfternoon, setDayMedicationAfternoon] = useState(false);
  const [medicationEvening, setDayMedicationEvening] = useState(false);
  const user = useSelector(selectUser);
  const idPatient = user.id;

  console.log("idPatient", idPatient);
  useEffect(() => {
    if (token === null) {
      history.push("/");
    }
  }, [token, history]);

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
      createMyDay(date, {
        date: date,
        itchScore: score,
        note: note,
        medicationAfternoon: medicationAfternoon,
        medicationEvening: medicationEvening,
        medicationMorning: medicationMorning,
        image: image,
        patientId: idPatient,
      })
    );

    setScore(0);
    setDayDate(today);
    setDayNote("");
    setDayImage("");
    setDayMedicationMorning(false);
    setDayMedicationAfternoon(false);
    setDayMedicationEvening(false);
  }

  return (
    <Container>
      <Form.Group>
        <label>Select the new day date</label>
        <input
          type="date"
          max={today}
          value={date} //Finally fixed tis display issue
          min="2020-07-31"
          style={{ marginRight: 15 }}
          onChange={(event) =>
            setDayDate(event.target.value) && console.log("note", date)
          }
        />
      </Form.Group>

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
    </Container>
  );
}
