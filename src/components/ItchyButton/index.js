import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./itchyButton.css";
import { updateMyDay } from "../../store/patientHistory/actions";
import { cloudName } from "../../config/constants";
import { CloudinaryContext, Image } from "cloudinary-react";
import { openUploadWidget } from "../../CloudinaryService";

//MATERIAL UI
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
// import Button from "@material-ui/core/Button";

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
    /*     transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }), */
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
    <Card className={classes.root}>
      <CardContent>
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
      </CardContent>

      <CardActions>
        {" "}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardActions>
          <Form key={props.day.id}>
            <Form.Group>
              <div className="form-group">
                <label lhtmlFor="exampleFormControlSelect1">
                  How much itchiness today? <strong>{`${score}`}</strong>
                </label>
                <select
                  value={`${score}`} //{SELECTED DATE} // itchiness score
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
                  placeholder={`${note}` || "What is your note for the day?"}
                ></textarea>
              </div>
            </Form.Group>

            <Form.Group className="">
              <Image
                cloudName={cloudName}
                publicId={image}
                width="300"
                crop="scale"
                className="img-thumbnail"
              />

              <CloudinaryContext cloudName={cloudName}>
                <Button className="mt-1" onClick={() => beginUpload()}>
                  Upload Image
                </Button>
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
            </Form.Group>
            <Form.Group className="form-check-inline">
              <Form.Label className="form-check-label">
                Morning medication{" "}
                <Form.Control
                  className="form-check-input"
                  value={medicationMorning}
                  onClick={(event) =>
                    setDayMedicationMorning(!medicationMorning)
                  }
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
                  onClick={(event) =>
                    setDayMedicationEvening(!medicationEvening)
                  }
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
          </Form>
        </CardActions>
      </Collapse>
    </Card>
    /*
    
    */
  );
}
