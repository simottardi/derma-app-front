import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
/* import Button from "react-bootstrap/Button"; */
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

//MATERIAL UI
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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

  const handleDateChange = (date) => {
    setDayDate(date);
  };

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
    <Accordion
      style={{
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 12,
        paddingLeft: 12,
        backgroundColor: "#decbf5",
        marginTop: 6,
        marginBottom: 12,
      }}
      expanded
    >
      <AccordionDetails
        style={{
          borderTop: "1px solid rgba(0, 0, 0, .125)",
          borderBottom: "1px solid rgba(0, 0, 0, .125)",
          borderLeft: "1px solid rgba(0, 0, 0, .125)",
          borderRight: "1px solid rgba(0, 0, 0, .125)",
        }}
      >
        <Grid>
          <form noValidate autoComplete="off">
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="baseline"
              style={{ width: "100%", marginBottom: 16 }}
            >
              <Grid container direction="row">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    id="date-picker-inline"
                    format="yyyy/MM/dd"
                    label="Select the new day date"
                    value={date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>{" "}
              </Grid>
              <Grid container direction="row">
                <FormControl style={{ minWidth: 120, marginTop: 10 }}>
                  <InputLabel
                    shrink
                    id="demo-simple-select-placeholder-label-label"
                  >
                    Itch score:
                  </InputLabel>

                  <Select
                    label="Note"
                    id="demo-simple-select-filled"
                    value={`${score}`}
                    onChange={(event) =>
                      setScore(event.target.value) &&
                      console.log(event.target.value)
                    }
                    style={{ paddingLeft: 8 }}
                  >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              id="outlined-textarea"
              label="Note"
              variant="outlined"
              value={note}
              onChange={(event) =>
                setDayNote(event.target.value) && console.log("note", note)
              }
              placeholder={`${note}` || "What is your note for the day?"}
              variant="filled"
              multiline
              style={{ width: "100%", marginBottom: 16 }}
            />
            <Image
              cloudName={cloudName}
              publicId={image}
              width="300"
              crop="scale"
              className="img-thumbnail"
              style={{ marginBottom: 16 }}
            />

            <CloudinaryContext cloudName={cloudName}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  allign="center"
                  justify="center"
                  color="primary"
                  onClick={() => beginUpload()}
                  style={{ marginBottom: 16 }}
                >
                  Upload Image
                </Button>
              </Grid>
              <section>
                {images.map((i) => (
                  <Image
                    key={i}
                    publicId={i}
                    fetch-format="auto"
                    quality="auto"
                    className="img-thumbnail"
                  />
                ))}
              </section>
            </CloudinaryContext>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                  value={medicationMorning}
                  onClick={(event) =>
                    setDayMedicationMorning(!medicationMorning)
                  }
                  type="checkbox"
                  defaultChecked={medicationMorning}
                />
              }
              label="Medication morning"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                  value={medicationAfternoon}
                  onClick={(event) =>
                    setDayMedicationAfternoon(!medicationAfternoon)
                  }
                  type="checkbox"
                  defaultChecked={medicationAfternoon}
                />
              }
              label="Medication afternoon"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                  value={medicationEvening}
                  onClick={(event) =>
                    setDayMedicationEvening(!medicationEvening)
                  }
                  type="checkbox"
                  defaultChecked={medicationEvening}
                />
              }
              label="Medication evening"
            />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Button
                type="submit"
                onClick={submitForm}
                variant="contained"
                size="large"
                color="primary"
                style={{
                  backgroundColor: "#10a10b",
                  borderColor: "#005cbf",
                }}
              >
                Save changes
              </Button>
            </Grid>
          </form>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
