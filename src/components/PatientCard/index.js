import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Accordion,
  AccordionDetails,
  Container,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";

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

const AccordionSummary = withStyles({
  content: {
    flexGrow: 0,
  },
})(MuiAccordionSummary);

export default function PatientCard() {
  const classes = useStyles();
  const { email, id, address, createdAt, name } = useSelector(selectUser);

  // managing undefined types error
  const myDate = createdAt;
  const myDateSplitted =
    typeof myDate === "string" ? myDate.split("T")[0] : "nodate";

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
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">Your details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container text-align="center">
          <Typography>
            patient name: {name}
            <br />
            patient ID: {id} <br />
            email: {email} <br />
            address: {address} <br />
            Patient since: {myDateSplitted}
          </Typography>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}
