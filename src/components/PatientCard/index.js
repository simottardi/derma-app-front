import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  title: {
    fontSize: 14,
  },
}));

export default function PatientCard() {
  const classes = useStyles();
  const { token, email, id, address, createdAt, name } = useSelector(
    selectUser
  );
  console.log("createdAt", createdAt);

  //Splitting the date and time string into date and time

  let myDateSplit = (createdAtParam) => {
    if (createdAtParam !== undefined) {
      createdAtParam.split("T");
    } else {
      return "loading data";
    }
  };

  myDateSplit(createdAt);
  const myDate = myDateSplit[0];
  console.log("mydate", myDateSplit, myDateSplit[0]);
  return (
    <div>
      {/*      <div className={classes.root}> */}
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
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            /*             justify="left"
            align="left" */
            /*            className={classes.heading} */
            /*             style={{ marginBottom: 12, MarginTop: 6 }} */
          >
            Your details
          </Typography>
        </AccordionSummary>
        <AccordionDetails /* justify="center" alignItem="center" */>
          <Typography /* justify="center" align="center" */>
            patient name: {name}
            <br />
            patient ID: {id} <br />
            email: {email} <br />
            address: {address} <br />
            Patient since:{createdAt}
          </Typography>{" "}
        </AccordionDetails>
      </Accordion>
      {/*   </div> */}

      {/*       <Card
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
        {" "}
        <Typography
          variant="h6"
          justify="left"
          align="left"
          style={{ marginBottom: 12, MarginTop: 6 }}
        >
          Your details
        </Typography>
        <CardContent
          style={{
            paddingBottom: 3,
          }}
        >
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            patient name: {name}
            <br />
            patient ID: {id} <br />
            email: {email} <br />
            address: {address} <br />
            Patient since:{createdAt}
          </Typography>
        </CardContent>
      </Card> */}
    </div>
    /*     <div className="container pt-12 mb-4 ">
      <div className="card-deck text-center">
        <div className="card shadow-sm">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Your data:</h4>
          </div>
          <div className="card-body">
            <ul className="list-unstyled mt-3">
              <li>patient name: {name}</li>
              <li>patient ID: {id}</li>
              <li>email: {email}</li>
              <li>address: {address}</li>
              <li>Patient since:{createdAt}</li>
            </ul>
          </div>
        </div>
      </div>
    </div> */
  );
}
