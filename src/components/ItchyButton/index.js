import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./itchyButton.css";
import { updateMyDay } from "../../store/patientHistory/actions";
import { cloudName } from "../../config/constants";

import { CloudinaryContext, Image } from "cloudinary-react";
import { openUploadWidget } from "../../CloudinaryService";

export default function ItchyButton(props) {
  const dispatch = useDispatch();
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
  const [images, setImages] = useState([]); // this is the cloudinary array

  function submitForm(event) {
    event.preventDefault();

    console.log(
      "submit form",
      score,
      date,
      note,
      image,
      medicationMorning,
      medicationAfternoon,
      medicationEvening,
      images
    );
    dispatch(
      updateMyDay(date, {
        itchScore: score,
        note: note,
        medicationAfternoon: medicationAfternoon,
        medicationEvening: medicationEvening,
        medicationMorning: medicationMorning,
        image: images[0],
      })
    );
  }

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: `${cloudName}`,
      tags: [tag],
      uploadPreset: "upload",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        // console.log(photos);
        // console.log(images);
        if (photos.event === "success") {
          setImages([...images, photos.info.public_id]);
        }
      } else {
        console.log(error);
      }
    });
  };

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
        <Form.Label>Image tag</Form.Label>
        <Form.Control
          value={image}
          onChange={(event) =>
            setDayImage(event.target.value) && console.log("image url", image)
          }
          type="text"
          placeholder={`${image}` || "Upload an image for this day"}
        />
      </Form.Group>
      <Form.Group>
        <Image
          cloudName={cloudName}
          publicId={image}
          width="300"
          crop="scale"
        />
        <p></p>
        <CloudinaryContext cloudName={cloudName}>
          <Button onClick={() => beginUpload()}>Upload Image</Button>
          <section>
            {images.map((i) => (
              <Image key={i} publicId={i} fetch-format="auto" quality="auto" />
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
      <Form.Group>
        <Button variant="primary" type="submit" onClick={submitForm}>
          Save changes
        </Button>
      </Form.Group>
    </Form>
  );
}
