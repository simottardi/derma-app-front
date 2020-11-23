import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";

import { selectUser } from "../../store/user/selectors";
import { useHistory } from "react-router-dom";
import { Button, Box, Typography } from "@material-ui/core";

import { selectTokenDoctor } from "../../store/doctor/selectors";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  loginButtonTextStyle: {
    color: "white",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  body1: {
    padding: theme.spacing(2),
  },
}));

export default function HomePages() {
  const { token } = useSelector(selectUser);
  const tokenDoctor = useSelector(selectTokenDoctor);
  const classes = useStyles();

  const history = useHistory();

  if (token !== null) {
    console.log("token not null");

    history.push("/myhomepage/");
  }

  if (token === null && tokenDoctor === null) {
    console.log("toke null");
    return (
      <Grid
        container
        direction="column"
        flex={1}
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <Typography variant="body" className={classes.body1}>
          Please log in to read and edit your data
        </Typography>

        <div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push("/login/patient");
            }}
          >
            <Typography variant="body1">Patient Login </Typography>
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push("/login/doctor");
            }}
          >
            <Typography variant="body1">doctor Login </Typography>
          </Button>
        </div>
      </Grid>
    );
  }

  return (
    <>
      <Container>Login or travel to your home page</Container>
    </>
  );
}
