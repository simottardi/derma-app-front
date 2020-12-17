import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./itchyButton.css";
import { updateMyDay } from "../../store/patientHistory/actions";
import { cloudName } from "../../config/constants";
import { CloudinaryContext, Image } from "cloudinary-react";
import { openUploadWidget } from "../../CloudinaryService";

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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  typographyStyles: {
    flex: 1,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function ItchyButton(props) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const bull = <span className={classes.bullet}>•</span>;

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
    >
      <AccordionSummary>
        <Grid>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Day:{`${date}`}
          </Typography>
          <Typography variant="h5" component="h2">
            Itchiness: {`${score}`}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {note}
          </Typography>
        </Grid>
      </AccordionSummary>

      <AccordionDetails
        style={{
          borderTop: "1px solid rgba(0, 0, 0, .125)",
          borderBottom: "1px solid rgba(0, 0, 0, .125)",
          borderLeft: "1px solid rgba(0, 0, 0, .125)",
          borderRight: "1px solid rgba(0, 0, 0, .125)",
        }}
      >
        <Grid>
          <form key={props.day.id} noValidate autoComplete="off">
            {/*        <FormControl className={classes.formControl}> */}
            {/*  <InputLabel id="demo-simple-select-helper-label">Age</InputLabel> */}
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="baseline"
              style={{ width: "100%", marginBottom: 16 }}
            >
              {/*   <label lhtmlFor="exampleFormControlSelect1">
                  How much itchiness today? <strong>{`${score}`}</strong>
                </label> */}
              <label>Itch score: </label>
              <Select
                labelId="demo-simple-select-filled-label"
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
