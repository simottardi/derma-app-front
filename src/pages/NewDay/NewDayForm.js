import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { selectToken, selectUser } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./itchyButton.css";
import { selectToday } from "../../store/appState/selectors";
import {
  createMyDay,
  fetchPatientHistory,
} from "../../store/patientHistory/actions";
import { CloudinaryContext, Image } from "cloudinary-react";
import { openUploadWidget } from "../../CloudinaryService";
import { cloudName } from "../../config/constants";

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
  const [images, setImages] = useState([]); // this is the cloudinary array

  console.log("cloudname", cloudName);

  useEffect(() => {
    if (token === null) {
      history.push("/");
    }
  }, [token, history]);

  useEffect(() => {
    //console.log("Use effect  --> fetch patient history dispatched ")
    dispatch(fetchPatientHistory());
  }, [dispatch]);

  function submitForm(event) {
    event.preventDefault();

    console.log(
      score,
      date,
      note,
      image,
      medicationMorning,
      medicationAfternoon,
      medicationEvening,
      setImages
    );
    dispatch(
      createMyDay(date, {
        date: date,
        itchScore: score,
        note: note,
        medicationAfternoon: medicationAfternoon,
        medicationEvening: medicationEvening,
        medicationMorning: medicationMorning,
        patientId: idPatient,
        image: images[0],
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
  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: `${cloudName}`,
      tags: [tag],
      uploadPreset: "upload",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "success") {
          setImages([...images, photos.info.public_id]);
        }
      } else {
        console.log(error);
      }
    });
  };

  return (
    <Container className="pt-2 pb-2 text-black">
      {/*     <div className="card-deck"> */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal text-primary">
            New entry: {date}
          </h4>
        </div>
        <div className="card-body text-center">
          <Form.Group>
            <Form.Label>Select the new day date</Form.Label>
            <input
              type="date"
              max={today}
              value={date}
              min="2020-07-31"
              style={{ marginRight: 15 }}
              onChange={(event) =>
                setDayDate(event.target.value) && console.log("note", date)
              }
            />
          </Form.Group>
          <Form.Group>
            <div className="form-group">
              <label for="exampleFormControlSelect1">
                How much itchiness today? <strong>{`${score}`}</strong>
              </label>
              <select
                value={`${score}`}
                onChange={(event) =>
                  setScore(event.target.value) &&
                  console.log(event.target.value)
                }
                className="form-control"
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
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                value={note}
                onChange={(event) =>
                  setDayNote(event.target.value) && console.log("note", note)
                }
                type="text"
                placeholder={`${note}` || "What is your note for the day?"}
              ></textarea>
            </div>
          </Form.Group>
          <Form.Group>
            {/*             <Image
              cloudName={cloudName}
              publicId={image}
              width="600"
              crop="scale"
            /> */}

            <CloudinaryContext cloudName={cloudName}>
              <Button onClick={() => beginUpload()}>Upload Image</Button>
              <section>
                {images.map((i) => (
                  <Image
                    key={i}
                    publicId={i}
                    fetch-format="auto"
                    width="300"
                    crop="scale"
                    className="mt-1 img-thumbnail"
                  />
                ))}
              </section>
            </CloudinaryContext>
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
                onClick={(event) =>
                  setDayMedicationAfternoon(!medicationAfternoon)
                }
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
          <Form.Group>
            <Button variant="success" type="submit" onClick={submitForm}>
              Save changes
            </Button>
          </Form.Group>
        </div>
      </div>
      {/* 
      </div> */}
    </Container>
  );
}
