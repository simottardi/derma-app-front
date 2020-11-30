import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
/* import Button from "react-bootstrap/Button"; */
import { login } from "../../store/doctor/actions";
import { selectTokenDoctor } from "../../store/doctor/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";

import {
  Typography,
  Button,
  FormControl,
  Input,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  elements: {
    textAlign: "center",
    margin: theme.spacing(2),
  },
}));

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const tokenDoctor = useSelector(selectTokenDoctor);
  const history = useHistory();

  const classes = useStyles();

  console.log("email", email, "password", password);

  useEffect(() => {
    if (tokenDoctor !== null) {
      history.push("/doctor/homepage");
    }
  }, [tokenDoctor, history]);

  function submitForm(event) {
    console.log("hi");
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  return (
    <Container align="center" maxWidth="sm" fixed style={{ marginTop: 12 }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography
          variant="h5"
          justify="center"
          align="center"
          style={{ marginBottom: 12 }}
        >
          Doctor Login
        </Typography>
        <div>
          <form
            noValidate
            autoComplete="off" /* styles={{ margin: 1, width: "25ch" }} */
          >
            <FormControl>
              {/*             <InputLabel htmlFor="my-input">Email address</InputLabel> */}
              <Input
                className={classes.elements}
                id="this-email"
                /* aria-describedby="my-helper-text" */
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                margin="normal"
                variant="outlined"
                required
                placeholder="Email"
                fullWidth
              />

              {/*        <InputLabel htmlFor="this-password">Password</InputLabel> */}
              <Input
                className={classes.elements}
                id="this-password"
                /*   aria-describedby="my-helper-text" */
                label="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                margin="normal"
                variant="outlined"
                type="password"
                placeholder="Password"
                required
                fullWidth
              />

              <Button
                className={classes.elements}
                type="submit"
                onClick={submitForm}
                variant="contained"
                color="primary"
                fullWidth
              >
                Log in
              </Button>
            </FormControl>
          </form>
        </div>
      </Grid>
    </Container>
  );
}
